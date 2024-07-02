import { createContext, useReducer, useState } from "react";

const OrderContext = createContext({
  order: [],
  userSelectedItems: [],
  setOrder: () => {},
  clearOrder: () => {},
  addUserSelectedItems: () => {},
  removeUserSelectedItems: () => {},
});

function orderReducer(state, action) {
  switch (action.type) {
    case "SET_ORDER":
      return { ...state, order: { ...action.order } };
  }
}

function customItemsReducer(state, action) {
  const updatedItems = [...state.userSelectedItems];
  const itemIndex = updatedItems.findIndex(
    (item) => item.id === action.item._id
  );
  
  switch (action.type) {
    case "ADD_ITEM":
      if (itemIndex >= 0) {
        updatedItems[itemIndex].quantity += 1;
      } else {
        updatedItems.push({
          id: action.item._id,
          name: action.item.name,
          price: action.item.price,
          quantity: 1,
        });
      }
      
      return { ...state, userSelectedItems: updatedItems };
    case "REMOVE_ITEM":

      if(itemIndex >= 0 && updatedItems[itemIndex].quantity > 1){
          updatedItems[itemIndex].quantity -= 1
      }else{
        updatedItems.splice(itemIndex, 1)
      }
      
    return { ...state, userSelectedItems: updatedItems };
    default:
      return state;
  }
}

export function OrderContextProvider({ children }) {
  const [order, dispatchAction] = useReducer(orderReducer, { order: null });
  const [selectedItems, dispatchItems] = useReducer(customItemsReducer, {
    userSelectedItems: [],
  });

  const addItem = (item) => {
    dispatchItems({ type: "ADD_ITEM", item });
  };

  const removeItem = (item) => {
    dispatchItems({ type: "REMOVE_ITEM", item });
  };

  const setOrder = (order) => {
    dispatchAction({ type: "SET_ORDER", order: order });
  };

  const clearOrder = () => {
    setTableOrder([]);
  };

  const orderContext = {
    userSelectedItems: selectedItems,
    addUserSelectedItems: addItem,
    removeUserSelectedItems: removeItem,

    order: order,
    setOrder: setOrder,
    clearOrder: clearOrder,
  };

  return (
    <OrderContext.Provider value={orderContext}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
