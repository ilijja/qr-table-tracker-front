import { useContext, useEffect, useState } from "react";
import MenuForm from "./MenuForm";
import UserProgressContext from "../../store/UserProgressContext";
import MenuItems from "./MenuItems";
import ProductContext from "../../store/ProductContext";
import Sidebar from "../Sidebar";
import RightContainer from "../RightContainer";

const MenuPage = (props) => {
  const userProgressCtx = useContext(UserProgressContext);

  const onAddMenuHandler = () => {
    userProgressCtx.showAddMenu();
  };

  return (
    <>

    <RightContainer>
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h1 className="text-2xl font-semibold leading-1 text-gray-900">
              Menus
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              
            </p>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              onClick={onAddMenuHandler}
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Menu
            </button>
          </div>
        </div>
      </div>


      <MenuForm />
      <MenuItems />
    </RightContainer>
    
   
      
    </>
  );
};

export default MenuPage;
