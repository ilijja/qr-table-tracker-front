import { createContext, useState } from "react";
import { useReducer } from "react";

const CartContext = createContext({
  items: [],
  progress: '',
  addItem: () => {},
  removeItem: () => {},
  increaseItem: () => {},
  clearCartItems: () => {},
  showCart: () => {},
  hideCart: () => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.findIndex(
        (item) => item._id === action.item._id
      );

      if (existingItem !== -1) {
        const updatedItems = state.items.map((item, index) => {
          if (existingItem === index) {
            return { ...item, quantity: item.quantity + action.quantity };
          }
          return item;
        });

        return { ...state, items: updatedItems };
      } else {
        const newItem = { ...action.item, quantity: action.quantity };
        return { ...state, items: [...state.items, newItem] };
      }
    case "REMOVE_ITEM":
      const updatedItems = state.items.filter(
        (item) => item._id !== action.id
      );
      return { ...state, items: updatedItems };
    case "INCREASE_ITEM":
      return null;
    case "CLEAR_ITEMS":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cartState, dispatchAction] = useReducer(cartReducer, { items: [] });
  const [progress, setProgress] = useState('')

  const addItem = (item, quantity) => {
    dispatchAction({ type: "ADD_ITEM", item: item, quantity: quantity });
  };

  const removeItem = (id) => {
    dispatchAction({ type: "REMOVE_ITEM", id: id });
  };

  const increaseItem = (item) => {
    dispatchAction({ type: "INCREASE_ITEM", item: item });
  };

  const clearCartItems = () => {
    dispatchAction({ type: "CLEAR_ITEMS" });
  };

  const showCart = () => {
    setProgress('cart')
  }

  const hideCart = () => {
    setProgress('')
  }

  const cartContext = {
    items: cartState.items,
    progress: progress,

    addItem,
    removeItem,
    increaseItem,
    clearCartItems,
    showCart,
    hideCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
