import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../utils/api";

const initialState = {
  cart: [],
};

export const handlePurchase = createAsyncThunk(
  "cart/handlePurchase",
  async ({ userId, cart, token }, { dispatch, rejectWithValue }) => {
    const bouquetsToPurchase = cart.map((bouquet) => ({
      id: bouquet.id,
      prix: bouquet.price,
    }));

    const requestData = {
      userId,
      bouquets: bouquetsToPurchase,
    };

    try {
      const result = await postData(
        "http://localhost:3001/purchase",
        requestData,
        {},
        token
      );

      // Dispatch an action to clear the cart after successful purchase
      dispatch(purchaseCart({ userId, bouquets: bouquetsToPurchase }));

      return result; // Return result to handle it further if needed
    } catch (error) {
      console.error("Error during purchase:", error);
      return rejectWithValue(error.message); // Return error message
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    purchaseCart(state, action) {
      const { userId, bouquets } = action.payload;
      state.cart = [];
    },
  },
});

export const { addToCart, purchaseCart } = cartSlice.actions;
export default cartSlice.reducer;
