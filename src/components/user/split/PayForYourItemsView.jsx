import { useEffect, useState } from "react";
import ItemView from "./ItemView";

const PayForYourItemsView = ({ orderItem, onYourPrice, cancelSplit }) => {

    const [totals, setTotals] = useState({})
    const [yourPrice, setYourPrice] = useState(0)
    const [leftPrice, setLeftPrice] = useState(0)

    const onTotalChangeHandler = (itemId, newTotal) => {
        setTotals((prevTotals) => ({ ...prevTotals, [itemId]: newTotal }));
    }

    useEffect(() => {
        const totalSum = Object.values(totals).reduce((acc, curr) => acc + curr, 0);
        setYourPrice(totalSum);
    }, [totals]);

    const setCustomPriceHandler = () => {
        onYourPrice(yourPrice)
    }

    const onCancelSplit = () => {
        cancelSplit()
    }

  return (
    <>
      <div className="flex flex-col p-5 gap-5 h-96 overflow-y-auto">
        {orderItem.items.map(item => (
            <ItemView key={item._id} item={item} onTotalChange={onTotalChangeHandler}/>
        ))}
      </div>


      <div className="flex flex-col sticky bottom-0 gap-3 bg-white px-5 pb-3">
        <div className="flex flex-col gap-2 my-1 border-b border-t border-gray-200 py-5 text-sm text-gray-500 ">
          <div className="flex flex-row justify-between">
            <p>Left to pay</p>
            <p>{orderItem.totalPrice - yourPrice} RSD</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className=" text-gray-900 text-lg">You share</p>
            <p className=" text-gray-900 text-lg">{yourPrice} RSD</p>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-x-1">
          <button
            type="button"
            onClick={onCancelSplit}
            className="rounded-full w-full bg-red-100 px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Remove Split
          </button>
          <button
            type="button"
            onClick={setCustomPriceHandler}
            className="rounded-full w-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confirm
          </button>
        </div>
      </div>

    </>
  );
};

export default PayForYourItemsView;
