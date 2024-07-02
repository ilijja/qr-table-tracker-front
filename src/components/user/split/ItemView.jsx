import { useContext, useEffect, useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import OrderContext from "../../../store/OrderContext";

const ItemView = ({ item, onTotalChange }) => {
  const [count, setCount] = useState(0);
  const [productTotal, setProductTotal] = useState(0);
  const {addUserSelectedItems, removeUserSelectedItems} = useContext(OrderContext)

  const increaseCount = () => {
    if (count < item.quantity) {
      addUserSelectedItems(item)
      setCount((prev) => prev + 1);
    }
  };

  const decreaseCount = () => {
    if (count > 0) {
      removeUserSelectedItems(item)
      setCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const newTotal = count * item.price;
    setProductTotal(newTotal);
    onTotalChange(item._id, newTotal);
  }, [count, item.price, item._id]);

  return (
    <>
      <div className="flex justify-between text-sm">
        <p>{item.name}</p>
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex items-center">
            <p className="text-xs m-auto text-gray-500">{productTotal} RSD</p>
          </div>

          <div className="flex w-28 min-w-fit justify-between">
            <button
              type="button"
              onClick={decreaseCount}
              className="rounded-full bg-indigo-100 p-0.5 text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <MinusIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </button>
            <p>
              {count} of {item.quantity}
            </p>
            <button
              type="button"
              onClick={increaseCount}
              className="rounded-full bg-indigo-100 p-0.5 text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemView;
