import { createContext, useReducer, useState } from "react";

const OrderContext = createContext({
  order: [],
  setOrder: () => {},
  clearOrder: () => {},
});

function orderReducer(state, action){

     switch (action.type){
        case "SET_ORDER":
            return {...state, order: {...action.order}}
     }
}


export function OrderContextProvider({ children }) {
  const [order, dispatchAction] = useReducer(orderReducer, {order: null})

  const setOrder = (order) => {
    dispatchAction({type: "SET_ORDER", order: order})
  }

  const clearOrder = () => {
    setTableOrder([])
  }

  const orderContext = {
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
