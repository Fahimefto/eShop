import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  cart: {
    CartItems: [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const newItems = action.payload;
      const existItems = state.cart.CartItems.find(
        (item) => item.slug === newItems.slug
      );
      const CartItems = existItems
        ? state.cart.CartItems.map((item) =>
            item.name === existItems.name ? newItems : item
          )
        : [...state.cart.CartItems, newItems];
      return { ...state, cart: { ...state.cart, CartItems } };
    }
    case "REMOVE_ITEM": {
      const CartItems = state.cart.CartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      return { ...state, cart: { ...state.cart, CartItems } };
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {children}</Store.Provider>;
}

