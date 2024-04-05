import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const ProductModalView = ({ product, hideSplit, addOrder }) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((prev) => {
      return prev + 1;
    });
  };

  const decrease = () => {
    if (quantity < 2) return;
    setQuantity((prev) => {
      return prev - 1;
    });
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-30vh)] max-h-[calc(100vh-10vh)] overflow-auto">
        <div onClick={hideSplit} className="absolute bg-white bg-opacity-50 h-12 w-12 rounded-full right-5 top-5">
            <div className="flex flex-col items-center w-full h-full justify-center">
            <XMarkIcon className="h-6 w-6 "></XMarkIcon>
            </div>
        </div>

      <div>
        <div className="bg-gray-100 h-56 flex-shrink-0"></div>

        <div className="flex flex-col gap-8 p-5">
          <h1 className="text-4xl font-semibold text-zinc-800">{product.name}</h1>
          <p className=" text-xl font-semibold text-indigo-600">{product.price} RSD</p>
          <div className="overflow-auto">
            <p className="text-zinc-800">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row sticky bottom-0 w-screen px-5 gap-1 py-5 bg-white bg-opacity-80">
        <div className="flex items-center justify-center w-1/3 bg-gray-100 rounded-full py-1">
          <div className="flex w-28 px-2 justify-between items-center">
            <button
              type="button"
              onClick={decrease}
              className="rounded-full bg-indigo-100 px-1 py-1 text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <MinusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-lg font-semibold">{quantity}</p>
            <button
              type="button"
              onClick={increase}
              className="rounded-full bg-indigo-100 px-1 py-1 text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="w-2/3 flex items-center">
          <button
            type="button"
            onClick={() => addOrder(product, quantity)}
            className="rounded-full w-full bg-indigo-600 px-4 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModalView;
