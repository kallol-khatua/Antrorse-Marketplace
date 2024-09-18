import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) ?? [],
  quantities: JSON.parse(localStorage.getItem("quantity")) ?? [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;

      //check if product exists
      const itemExist = state.cartItems.find(
        (productID) => productID === product
      );

      if (itemExist) {
        console.log("Item already exists in the cart");
      } else {
        state.cartItems = [...state.cartItems, product];
        console.log("Item added to the cart");
        localStorage.setItem("cart", JSON.stringify(state.cartItems));

        state.quantities = [
          ...state.quantities,
          {
            id: product,
            quantity: 1,
          },
        ];

        localStorage.setItem("quantity", JSON.stringify(state.quantities));
      }
    },
    removeFromCart(state, action) {
      const product = action.payload;
      const itemRemove = state.cartItems.filter((item) => item !== product);
      state.cartItems = itemRemove; //updated here on 29012024
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      state.quantities.splice(itemRemove, 1);
      localStorage.setItem("quantity", JSON.stringify(state.quantities));
    },

    incrementQuantity(state, action) {
      const quantityIdToUpdate = action.payload;

      console.log(quantityIdToUpdate, "quantityIdToUpdate");

      const index = state.quantities.findIndex(
        (item) => item.id === quantityIdToUpdate
      );

      if (index === -1) {
        state.quantities = [
          ...state.quantities,
          {
            id: quantityIdToUpdate,
            quantity: 1,
          },
        ];
      } else {
        state.quantities[index].quantity += 1;
      }
      localStorage.setItem("quantity", JSON.stringify(state.quantities));
    },
    decrementQuantity(state, action) {
      const quantityIdToUpdate = action.payload;

      const index = state.quantities.findIndex(
        (item) => item.id === quantityIdToUpdate
      );

      if (index !== -1) {
        state.quantities[index].quantity -= 1;
        if (state.quantities[index].quantity === 0) {
          state.quantities.splice(index, 1);
          state.cartItems.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
        }
      }
      localStorage.setItem("quantity", JSON.stringify(state.quantities));
    },

    manualIncrementQuantity(state, action) {
      const { productId, quantity } = action.payload;

      const index = state.quantities.findIndex(
        (quantity) => quantity.id === productId
      );

      state.quantities[index].quantity = quantity;
      localStorage.setItem("quantity", JSON.stringify(state.quantities));

      // console.log(productId, quantity, manualUpdate);
    },

    clearCart(state, action) {
      state.cartItems = [];
      state.quantities = [];
      localStorage.removeItem("cart");
      localStorage.removeItem("quantity");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  manualIncrementQuantity,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
