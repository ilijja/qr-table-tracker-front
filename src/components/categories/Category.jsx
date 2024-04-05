import { PlusIcon, PencilSquareIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import ProductContainer from "./ProductContainer";
import { useContext, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import UserProgressContext from "../../store/UserProgressContext";
import CategoryAction from "./CategoryAction";
import { useLocation } from "react-router-dom";

const Category = (props) => {
  const [showProducts, setShowProducts] = useState(false);
  const location = useLocation();

  const isMenuRoute = location.pathname.startsWith('/menu');

  const expandCategoryHandler = () => {
    setShowProducts((prev) => !prev);
  };


  return (
    <>
      <div>
        <div
          className="px-2 py-2 sm:px-6 cursor-pointer block hover:bg-gray-50 rounded-lg"
          onClick={expandCategoryHandler}
          key={props.category._id}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="truncate flex flex-row text-sm font-medium text-indigo-1000">
              {props.category.name}
              <ChevronDownIcon
                className={`-mr-1 ml-0 h-5 w-5 transition-transform duration-500 ${
                  showProducts ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
              />
            </div>

            {!isMenuRoute && <CategoryAction category={props.category} onDeleteCategory={props.onDeleteCategory} onEditCategory={props.onEditCategory} onAddProduct={props.onAddProduct}/>}
          </div>
        </div>

        <Transition
          show={showProducts}
          enter="transition-[max-height] duration-700 ease-in"
          enterFrom="max-h-0"
          enterTo="max-h-[1000px]" 
          leave="transition-[max-height] duration-500 ease-out"
          leaveFrom="max-h-[1000px]"
          leaveTo="max-h-0"
        >
          <ProductContainer categoryId={props.category._id} />
        </Transition>
      </div>
    </>
  );
};

export default Category;
