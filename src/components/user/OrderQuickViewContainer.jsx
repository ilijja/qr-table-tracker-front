import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import UserProgressContext from "../../store/UserProgressContext";
import { useNavigate, useSubmit } from "react-router-dom";

const OrderQuickViewContainer = () => {
  const submit = useSubmit();
  const navigate = useNavigate()
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [unselectedOrders, setUnselectedOrders] = useState([]);
  const [allAccepted, setAllAccepted] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const { progress, hideOrdersModal, currentTable } =
    useContext(UserProgressContext);

  const selectOrder = (order) => {
    setUnselectedOrders((prevUnselectedOrders) =>
      prevUnselectedOrders.filter((o) => o._id !== order._id)
    );

    setSelectedOrders((prevSelectedOrders) => {
      const existingOrderIndex = prevSelectedOrders.findIndex(
        (o) => o.productId === order.productId
      );

      if (existingOrderIndex > -1) {
        return prevSelectedOrders.map((o, index) =>
          index === existingOrderIndex
            ? { ...o, quantity: o.quantity + order.quantity }
            : o
        );
      } else {
        return [...prevSelectedOrders, { ...order, accepted: true }];
      }
    });
  };

  useEffect(() => {
    const totalPrice = selectedOrders.reduce(
      (total, order) => total + order.quantity * order.price,
      0
    );
    setTotalPrice(totalPrice);
  }, [selectedOrders]);

  const onSelectAllHandler = () => {
    for (let order of unselectedOrders) {
      selectOrder(order);
    }
  };

  const onAcceptOrdersHandler = () => {
    const formData = new FormData();

    formData.append("selectedOrders", JSON.stringify(selectedOrders));
    formData.append("unselectedOrders", JSON.stringify(unselectedOrders));
    formData.append("tableId", JSON.stringify(currentTable.order.tableId));
    formData.append("orderId", JSON.stringify(currentTable.order._id));
    submit(formData, { method: "POST" });
  };

  const closeModalMenu = () => {
    hideOrdersModal();
  };

  const makeOrderHandler = () => {
    navigate(`/menu/${currentTable._id}`);
  };

  useEffect(() => {
    if (!currentTable || !currentTable.order) {
      setSelectedOrders([]);
      setUnselectedOrders([]);
      return;
    }


    const accepted = 0;
    const notAccepted = 1;
    let orders = [[], []];
    setAllAccepted(true);

    currentTable.order.items.forEach((item) => {
      if (!item.accepted) {
        setAllAccepted(false);
      }

      return item.accepted
        ? orders[accepted].push(item)
        : orders[notAccepted].push(item);
    });

    setSelectedOrders(orders[accepted]);
    setUnselectedOrders(orders[notAccepted]);
  }, [currentTable]);

  return (
    <Transition.Root show={progress === "orders"} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModalMenu}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2 flex flex-col">
                  <div className="flex">
                    <div className="flex-1 h-80 overflow-auto px-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 pb-5"
                      >
                        Ordered Items
                      </Dialog.Title>
                      <ul className="space-y-1">
                        {unselectedOrders.map((order) => (
                          <li
                            key={order._id}
                            className="flex items-center space-x-3 p-2 cursor-pointer block bg-gray-100 hover:bg-gray-200 rounded-lg"
                            onClick={() => selectOrder(order)}
                          >
                            <span className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {order.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                Quantity: {order.quantity}
                              </p>
                            </span>
                            <div className="flex flex-row justify-center items-center">
                              <p className="text-xs text-gray-500">
                                {order.quantity * order.price} RSD
                              </p>
                              <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 h-80 overflow-auto px-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 pb-5"
                      >
                        Accepted items
                      </Dialog.Title>
                      <ul className="space-y-1">
                        {selectedOrders.map((order) => (
                          <li
                            key={order._id}
                            className="flex items-center space-x-3 p-2 cursor-pointer block bg-gray-100 hover:bg-gray-200 rounded-lg"
                          >
                            <span className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {order.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                Quantity: {order.quantity}
                              </p>
                            </span>
                            <div className="flex flex-row justify-center items-center">
                              <p className="text-xs text-gray-500">
                                {order.quantity * order.price} RSD
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                 {selectedOrders.length>0 && <div className="container mx-auto">
                    <div className="flex justify-between ml-auto w-1/2 font-medium p-5">
                      <p className="text-gray-600">Subtotal:</p>
                      <p className="text-gray-600">{totalPrice} RSD</p>
                    </div>
                  </div>}

                  <div className="flex flex-row">
                    <div className="flex basis-1/2 justify-between p-5">
                      <button
                        type="button"
                        onClick={makeOrderHandler}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Make order
                      </button>

                      {unselectedOrders.length > 0 && (
                        <button
                          type="button"
                          onClick={onSelectAllHandler}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Accept all
                        </button>
                      )}
                    </div>

                    <div className="flex basis-1/2 justify-end p-5">
                      {selectedOrders.length > 0 && !allAccepted && (
                        <button
                          type="button"
                          onClick={onAcceptOrdersHandler}
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default OrderQuickViewContainer;
