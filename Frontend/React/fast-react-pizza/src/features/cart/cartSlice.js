import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "mandatarian",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.pizzaId != action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      state.cart.forEach((cartItem) => {
        if (cartItem.pizzaId === action.payload) {
          cartItem.quantity++;
          cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
        }
      });
    },

    decreaseItemQuantity(state, action) {
      state.cart.forEach((cartItem) => {
        if (cartItem.pizzaId === action.payload) {
          cartItem.quantity--;
          cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
          if (cartItem.quantity === 0) {
            createSlice.caseReducers.deleteItem(state, action);
          }
        }
      });
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCartTotalPrice = (store) => {
  return store.cart.cart.reduce((sum, cartItem) => {
    return sum + cartItem.totalPrice;
  }, 0);
};

export const getCartLength = (store) => {
  return store.cart.cart.length;
};

export const getPizzaQuantityById = function (id) {
  return (store) => {
    return store.cart.cart.find((cartItem) => cartItem.pizzaId === id)
      ?.quantity;
  };
};
