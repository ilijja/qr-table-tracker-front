import { createContext, useReducer, useCallback } from "react";

const ProductContext = createContext({
  menus: [],
  categories: [],
  products: [],

  addMenu: (menu) => {},
  removeMenu: (id) => {},
  setMenus: (menus) => {},

  addCategory: (category) => {},
  addCategories: (categories) => {},
  removeCategory: (category) => {},
  setCategories: (categories) => {},

  addProduct: (product) => {},
  removeProduct: (id) => {},
  setProducts: (products) => {},
});

function menuReducer(state, action) {
  switch (action.type) {
    case "ADD_MENU":
      return { ...state, menus: [...state.menus, action.menu] }; 
    case "REMOVE_MENU":
      return {
        ...state,
        menus: state.menus.filter((menu) => menu._id !== action.id),
      };
    case "SET_MENUS":
      return { ...state, menus: action.menus };
    default:
      return state;
  }
}

function categoryReducer(state, action) {
  switch (action.type) {
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.category] };
    case "ADD_CATEGORIES":
      return { ...state, categories: action.categories };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.id
        ),
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.categories };
    default:
      return state;
  }
}

function productReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, products: [state.products, action.product]};
    case "REMOVE_PRODUCT":
      return null;
    case "SET_PRODUCTS":
      return {...state, products: action.products};
    default:
      return state;
  }
}

export function ProductContextProvider({ children }) {
  const [menuState, dispatchMenu] = useReducer(menuReducer, { menus: [] });
  const [categoryState, dispatchCategory] = useReducer(categoryReducer, {
    categories: [],
  });
  const [productState, dispatchProduct] = useReducer(productReducer, {
    products: [],
  });

  const addMenu = (menu) => {
    dispatchMenu({ type: "ADD_MENU", menu });
  };

  const removeMenu = (id) => {
    dispatchMenu({ type: "REMOVE_MENU", id });
  };

  const setMenus = menus => {
    dispatchMenu({ type: "SET_MENUS", menus: menus });
  }
    

  const addCategory = (category) => {
    dispatchCategory({ type: "ADD_CATEGORY", category });
  };

  const addCategories = useCallback(
    (categories) => {
      dispatchCategory({ type: "ADD_CATEGORIES", categories });
    },
    [dispatchCategory]
  );

  const removeCategory = (id) => {
    dispatchCategory({ type: "REMOVE_CATEGORY", id });
  };

  const setCategories = useCallback(
    (categories) => {
      dispatchCategory({ type: "SET_CATEGORIES", categories: categories });
    },
    [dispatchCategory]
  );

  const setProducts = useCallback(
    (products) => {
        dispatchProduct({type: "SET_PRODUCTS", products: products})
    }, [dispatchProduct]
  )

  const productContext = {
    menus: menuState.menus,
    categories: categoryState.categories,
    products: productState.products,

    addMenu,
    removeMenu,
    setMenus,

    addCategory,
    addCategories,
    removeCategory,
    setCategories,

    setProducts,
  };

  return (
    <ProductContext.Provider value={productContext}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
