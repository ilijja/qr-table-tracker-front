import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const DivideEqualy = ({ total, onYourPrice }) => {
  const [totalPeople, setTotalPeople] = useState(1);
  const [payFor, setPayFor] = useState(1);
  const [yourPrice, setYourPrice] = useState(0);
  const [leftPrice, setLeftPrice] = useState(0);

  useEffect(() => {
    setYourPrice((total / totalPeople) * payFor);
    setLeftPrice(total - yourPrice);
  }, [totalPeople, payFor, total]);

  const increasePayFor = () => {
    payFor >= totalPeople
      ? () => {}
      : setPayFor((prev) => {
          return prev + 1;
        });
  };

  const decreasePayFor = () => {
    payFor <= 1
      ? setPayFor(payFor)
      : setPayFor((prev) => {
          return prev - 1;
        });
  };

  const increasePeople = () => {
    setTotalPeople((prev) => {
      return prev + 1;
    });
  };

  const decreasePeople = () => {
    totalPeople <= 1
      ? () => {}
      : setTotalPeople((prev) => {
          return prev - 1;
        });
  };

  const setCustomPriceHandler = () => {
    onYourPrice(yourPrice);
  };

  return (
    <>
      <div className="flex flex-col p-5 gap-8 h-96 overflow-y-auto">
        <div className="flex justify-between">
          <p>Total people in your table</p>
          <div className="flex w-20 justify-between">
            <button
              type="button"
              onClick={decreasePeople}
              className="rounded-full bg-indigo-100 p-0.5 text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <MinusIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </button>
            <p>{totalPeople}</p>
            <button
              type="button"
              onClick={increasePeople}
              className="rounded-full bg-indigo-100 p-0.5 text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <p>People you pay for</p>
          <div className="flex w-20 justify-between">
            <button
              type="button"
              onClick={decreasePayFor}
              className="rounded-full bg-indigo-100 p-0.5 text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <MinusIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </button>
            <p>{payFor}</p>
            <button
              type="button"
              onClick={increasePayFor}
              className="rounded-full bg-indigo-100 p-0.5 text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sticky bottom-0 gap-3 bg-white px-5 pb-3">
        <div className="flex flex-col gap-2 my-1 border-b border-t border-gray-200 py-5 text-sm text-gray-500 ">
          <div className="flex flex-row justify-between">
            <p>Left to pay</p>
            <p>{leftPrice} RSD</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className=" text-gray-900 text-lg">You share</p>
            <p className=" text-gray-900 text-lg">{yourPrice} RSD</p>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-x-1">
          <button
            type="button"
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

export default DivideEqualy;
