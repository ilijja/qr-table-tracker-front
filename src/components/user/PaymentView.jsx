import { useContext, useEffect, useState } from "react";
import OrderContext from "../../store/OrderContext";
import BottomModal from "./BottomModal";
import DivideEqualy from "./split/DivideEqualyView";
import { PencilIcon } from "@heroicons/react/24/solid";
import PayForYourItemsView from "./split/PayForYourItemsView";
import TipView from "./split/TipView";

const PaymentView = () => {
  const { order } = useContext(OrderContext);
  const [orderItem, setOrderItem] = useState(null);
  const [showSplitModal, setShowSplit] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [usersPrice, setUsersPrice] = useState(0);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    setOrderItem(order.order);
  }, [order]);

  useEffect(() => {
    if (orderItem) setUsersPrice(orderItem.totalPrice);
  }, [orderItem]);

  const onYourPriceHandler = (price) => {
    setUsersPrice(price);
    setShowSplit(false);
    scrollBottom()
  };

  const onCancelSplitHandler = () => {
    setUsersPrice(orderItem.totalPrice);
    setShowSplit(false);
  };

  const calculateTip = (amount) => {
    if (orderItem) {
      setTip((orderItem.totalPrice / 100) * amount);
    }
  };

  const customTipHandler = () => {
    setModalTitle("Pay custom tip");
    setShowSplit(true);
    setModalContent("tip");
  };

  const setCustomTipHandler = (tip) => {
    setTip(tip);
    setShowSplit(false);
  };

  const showSplitModalHandler = () => {
    setShowSplit(true);
    setModalTitle("Split the bill");
    setModalContent("split");
  };

  const showSplitYourItems = () => {
    setShowSplit(false);
    setTimeout(() => {
      setShowSplit(true);
      setModalTitle("Pay for your items");
      setModalContent("yourItems");
    }, 350);
  };

  const showSplitDivideEqualy = () => {
    setShowSplit(false);
    setTimeout(() => {
      setShowSplit(true);
      setModalTitle("Divide the bill equaly");
      setModalContent("equaly");
    }, 350);
  };

  const hideSplitModal = () => {
    setShowSplit(false);
    setTimeout(() => {
      setModalContent("");
    }, 150);
  };

  const scrollBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
  }

  return (
    <>
      {orderItem && (
        <div className="flex flex-col p-3 min-h-screen w-auto">
          <div className="p-5 h-auto w-full rounded-lg">
            <div className="flex flex-col gap-2">
              <p className=" text-sm text-indigo-500">Payment successful</p>
              <h1 className="text-4xl font-bold">Thanks for ordering</h1>
              <p className=" text-base text-gray-400">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>
            </div>

            <div className="mt-10">
              <p className="text-gray-600">Tracking number</p>
              <p className="text-indigo-500">555 333</p>
            </div>

            <div className="pt-6">
              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {orderItem.items.map(
                  (product) =>
                    product.accepted && (
                      <li key={product._id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          {/* <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  /> */}
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a>{product.name}</a>
                              </h3>
                              <p className="ml-4">
                                RSD {product.price * product.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Quantity: {product.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sticky bottom-0 gap-3 bg-white p-8">
        <div className="flex flex-row justify-between my-1 border-b border-gray-200 pb-5 text-sm text-gray-500 ">
          <p>Subtotal</p>
          {orderItem && <p>{orderItem.totalPrice} RSD</p>}
        </div>
        <div className="flex flex-row justify-between gap-x-1">
          <button
            type="button"
            onClick={showSplitModalHandler}
            className="rounded-full w-full bg-indigo-100 px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Split bill
          </button>
          <button
            type="button"
            onClick={() => {
              setUsersPrice(orderItem.totalPrice);
              scrollBottom()
            }}
            className="rounded-full w-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Pay fully
          </button>
        </div>
      </div>

      <div className="px-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Do you want to include a tip?</p>
          <div className="flex flex-row gap-1 justify-start">
            <p className="flex text-sm font-light gap-1 text-gray-800">
              Tip amount:{" "}
            </p>
            <p className=" text-xs font-semibold flex flex-col justify-center">
              {tip.toFixed(2)} RSD
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => calculateTip(5)}
              className="rounded-full border-none bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200"
            >
              5%
            </button>

            <button
              type="button"
              onClick={() => calculateTip(7)}
              className="rounded-full border-none bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200"
            >
              7%
            </button>

            <button
              type="button"
              onClick={() => calculateTip(10)}
              className="rounded-full border-none bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200"
            >
              10%
            </button>
            <button
              type="button"
              onClick={() => calculateTip(0)}
              className="rounded-full border-none bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200"
            >
              No tip
            </button>
          </div>

          <div className="flex bg-white rounded-full py-1 justify-start w-fit">
            <div className="flex flex-col align-middle text-center justify-center">
              <PencilIcon className="p-0.5 h-5 w-5" />
            </div>
            <p
              type="button"
              onClick={customTipHandler}
              className="rounded-full border-none px-2 w-fit py-2.5 text-sm font-semibold text-gray-700"
            >
              Pay custom tip
            </p>
          </div>

          {orderItem && (
            <div className="flex flex-col gap-2 my-1 border-b border-t border-gray-200 py-5 text-sm text-gray-500 ">
              <div className="flex flex-row justify-between">
                <p>Left to pay</p>
                <p>{orderItem.totalPrice - usersPrice} RSD</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className=" text-gray-900 text-lg">You pay</p>
                <p className=" text-gray-900 text-lg">
                  {(usersPrice + tip).toFixed(2)} RSD
                </p>
              </div>
            </div>
          )}

          <div className="my-8">
            <button
              type="button"
              className="rounded-full w-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirm payment
            </button>
          </div>
        </div>
      </div>

      <BottomModal
        showSplitModal={showSplitModal}
        hideSplitModal={hideSplitModal}
        title={modalTitle}
      >
        {
          <div className="pb-5">
            {modalContent === "split" && (
              <div className="flex flex-col p-5 gap-8">
                <div className="flex flex-row justify-between">
                  <p className="flex flex-col align-middle text-center justify-center">
                    Pay for your items
                  </p>
                  <button
                    type="button"
                    onClick={showSplitYourItems}
                    className="rounded-full w-1/3  bg-indigo-100 px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Select
                  </button>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="flex flex-col align-middle text-center justify-center">
                    Divide bill equaly
                  </p>
                  <button
                    type="button"
                    onClick={showSplitDivideEqualy}
                    className="rounded-full w-1/3  bg-indigo-100 px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Select
                  </button>
                </div>
              </div>
            )}

            {modalContent === "yourItems" && (
              <PayForYourItemsView
                orderItem={orderItem}
                onYourPrice={onYourPriceHandler}
                cancelSplit={onCancelSplitHandler}
              />
            )}

            {modalContent === "equaly" && orderItem && (
              <DivideEqualy
                total={orderItem.totalPrice}
                onYourPrice={onYourPriceHandler}
              />
            )}

            {modalContent === "tip" && orderItem && (
              <TipView onChangeCustomTip={setCustomTipHandler} />
            )}
          </div>
        }
      </BottomModal>
    </>
  );
};

export default PaymentView;
