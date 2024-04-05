import { useContext, useEffect, useState, useRef } from "react";
import ShoppingCart from "./ShoppingCart";
import CartContext from "../../store/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import ProductContext from "../../store/ProductContext";
import CategoryView from "./CategoryView";
import BottomModal from "./BottomModal";
import ProductModalView from "./ProductModalView";
import { useNavigate, useSubmit } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import logoImg from '../../assets/bg/icon.png'


const MenuView = ({ menu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setProducts } = useContext(ProductContext);
  const containerRef = useRef(null);
  const [showLogo, setShowLogo] = useState(true);
  const { items, showCart, hideCart, addItem } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showSplitModal, setShowSplit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const submit = useSubmit();
  const token = getAuthToken();
  const navigate = useNavigate()

  const hideSplitModal = () => {
    setShowSplit(false);
  };

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

  const onClickProductHandler = (product) => {
    setCurrentProduct(product);
    setShowSplit(true);
  };

  const addToCartHandler = (product, quantity) => {
    addItem(product, quantity);
    showCart()
    hideSplitModal();
  };

  const handleScroll = () => {
    const atTop = containerRef.current.scrollTop === 0;
    if (atTop && isExpanded) {
      setShowLogo(true);
      setIsExpanded(false);
    } else if (!atTop && !isExpanded) {
      handleLogoChange(false);
      setIsExpanded(true);
    }
  };

  const handleLogoChange = (val) => {
    setTimeout(() => {
      setShowLogo(val);
    }, 300);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isExpanded]);

  const showCartHandler = () => {
    showCart();
  };

  const submitOrderHandler = () => {
    const formData = new FormData();
    formData.append("items", JSON.stringify(cartItems));
    submit(formData, { method: "POST" });
    if (token) {
      hideCart();
      navigate("/home");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-screen overflow-hidden">
        <div className="absolute right-5 top-5">
          <div className="flex justify-end">
            <a
              onClick={showCartHandler}
              className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ShoppingCartIcon className="p-0.5 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="w-full h-1/3 img bg-menu-pattern"></div>

        <div
          className={`transition-all ease-in-out duration-500 absolute ${
            isExpanded ? "top-0 h-screen" : "top-1/4 h-3/4"
          } w-full bg-black`}
          style={{
            borderTopLeftRadius: isExpanded ? "0%" : "100% 10%",
            borderTopRightRadius: isExpanded ? "0%" : "100% 10%",
          }}
        >
          {showLogo && (
            <div className="relative bottom-16">
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-transparent">
                  <img src={logoImg} />
                </div>
              </div>
            </div>
          )}
          <div
            ref={containerRef}
            className={`relative flex flex-col gap-3 overflow-y-auto bg-black ${
              isExpanded ? "h-screen" : "h-5/6 max-h-full"
            }`}
          >
            <div className="flex justify-center pb-5">
              <h1 className="text-white text-2xl">Kafeterija</h1>
            </div>

            {categories.map((item) => (
              <div key={item._id} className="flex flex-col gap-2">
                <CategoryView
                  onClickProduct={onClickProductHandler}
                  category={item}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ShoppingCart submitOrder={submitOrderHandler} />

      <BottomModal
        showSplitModal={showSplitModal}
        hideSplitModal={hideSplitModal}
      >
        {
          <ProductModalView
            product={currentProduct}
            hideSplit={hideSplitModal}
            addOrder={addToCartHandler}
          />
        }
      </BottomModal>
    </>
  );
};

export default MenuView;
