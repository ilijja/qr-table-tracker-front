import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const TipView = ({ onChangeCustomTip }) => {
  const [customTip, setCustomTip] = useState("");

  const customTipHandler = () => {
    onChangeCustomTip(customTip);
  };

  const setCustomTipHandler = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setCustomTip(value);
    } else {
      setCustomTip(0);
    }
  };
  

  return (
    <>
      <div className="flex flex-col p-5 gap-8 h-1/5 overflow-y-auto">
        <div className="mb-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Custom tip
          </label>
          <div className="relative mt-2 rounded-md ">
            <input
              onChange={setCustomTipHandler}
              type="number"
              name="price"
              id="price"
              className="block w-full border-b-2 py-1.5 pl-3 pr-12 outline-none text-gray-900  placeholder:text-gray-400  m:text-sm sm:leading-6"
              placeholder="0.00"
              aria-describedby="price-currency"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                RSD
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sticky bottom-0 gap-3 bg-white px-5 pb-3">
        <div className="flex flex-row justify-between gap-x-1">
          <button
            type="button"
            onClick={customTipHandler}
            className="rounded-full w-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default TipView;
