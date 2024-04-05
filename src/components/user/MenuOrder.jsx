import RightContainer from "../RightContainer";
import MenuItems from "../menu/MenuItems";
import ShoppingCart from "./ShoppingCart";

const MenuOrder = () => {


  return (
    <>
      <div className=" py-10 min-h-screen bg-gray-200">
        <RightContainer>
          <div className="border-b border-gray-200 bg-white px-4 py-5  sm:px-6">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h1 className="text-2xl font-semibold leading-1 text-gray-900">
                  Menus
                </h1>
                <p className="mt-1 text-sm text-gray-500"></p>
              </div>
            </div>
          </div>
          
          <MenuItems />
        </RightContainer>
      </div>
    </>
  );
};

export default MenuOrder;
