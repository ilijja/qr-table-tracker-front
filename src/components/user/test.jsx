import { useContext, useEffect, useState } from "react";
import ProductContext from "../../store/ProductContext";
import Category from "../categories/Category";
import RightContainer from "../RightContainer";
import { useNavigate, useNavigation, useSubmit } from "react-router-dom";
import CartContext from "../../store/CartContext";
import { getAuthToken } from "../../util/auth";
import ShoppingCart from "./ShoppingCart";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const MenuView = ({ menu }) => {
  const submit = useSubmit();
  const { setProducts } = useContext(ProductContext);
  const { items, showCart, hideCart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const token = getAuthToken();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    setCategories(menu.categories);
  }, [menu]);

  useEffect(() => {
    const products = categories.reduce((acc, category) => {
      return [...acc, ...category.products];
    }, []);

    setProducts(products);
  }, [categories]);

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const submitOrderHandler = () => {
    const formData = new FormData();
    formData.append("items", JSON.stringify(cartItems));
    submit(formData, { method: "POST" });

    if (token) {
      hideCart();
      navigate("/home");
    }
  };

  const showCartHandler = () => {
    showCart();
  };

  return (
    <>
      <header className=" h-auto w-auto">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>

          <div className="flex">
            <a
              onClick={showCartHandler}
              className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ShoppingCartIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>

      {categories.map((item) => (
        <div className=" my-3" key={item._id}>
          <RightContainer>
            <Category category={item} />
          </RightContainer>
        </div>
      ))}

      <RightContainer></RightContainer>
      <ShoppingCart submitOrder={submitOrderHandler} />
    </>
  );
};

export default MenuView;
