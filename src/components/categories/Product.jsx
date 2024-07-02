import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserProgressContext from "../../store/UserProgressContext";
import AddProductForm from "./AddProductForm";
import { getAuthToken } from "../../util/auth";
import CartContext from "../../store/CartContext";

const Product = ({ product }) => {
  const userProgressCtx = useContext(UserProgressContext);
  const cartContext = useContext(CartContext)
  const token = getAuthToken();
  const location = useLocation();

  const isMenuRoute = location.pathname.startsWith("/menu");
  const isAdminRoute = location.pathname.startsWith("/products");

  const onClickProductHandler = () => {
    console.log(product.image);
    if (token && isAdminRoute) {
      userProgressCtx.setCurrentProduct(product);
      userProgressCtx.setCurrentProductMethod("PUT");
      userProgressCtx.showAddProduct();
    }
    if(isMenuRoute){
      cartContext.addItem(product, 1)
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white py-2">
      <div
        onClick={onClickProductHandler}
        className="flex flex-row justify-between cursor-pointer hover:bg-gray-50 rounded-lg p-3"
      >
        <p className="text-gray-800 sm:text-sm">{product.name}</p>
        <p className="text-gray-500 sm:text-sm">
          {product.price + ".00"}
          <span className="ml-1 text-gray-500 sm:text-sm" id="price-currency">
            RSD
          </span>
        </p>
      </div>
    </div>
  );
};

export default Product;
