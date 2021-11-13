import React, { useReducer } from "react";
import CardContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    console.log(existingCartItemIndex);
    console.log(existingItem);
    console.log(updatedTotalAmount);
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;

      state.items[existingCartItemIndex].amount -= 1;
      console.log("test");
      console.log(state.items);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    // console.log(action);
    // console.log(state);
    // const existingCartItem = state.items;
    // const removeTargetItem = state.items.find((item) => item.id === action.id);
    // const removeTargetItemIndex = existingCartItem.indexOf(removeTargetItem);
    // const updatedTotalAmount = state.totalAmount - removeTargetItem.price;

    // console.log(removeTargetItemIndex);
    // let updatedItems;

    // if (removeTargetItem.amount === 1) {
    //   console.log(existingCartItem);
    //   updatedItems = existingCartItem.splice(removeTargetItemIndex, 1 ," ");
    //   console.log(updatedItems);
    // } else {
    //   updatedItems = existingCartItem[removeTargetItemIndex].amount - 1;
    // }

    // return {
    //   items: updatedItems,
    //   totalAmount: updatedTotalAmount,
    // };
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CartProvider;
