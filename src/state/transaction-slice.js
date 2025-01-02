import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchData } from "../utils/api";
export const fetchUserTransactions = createAsyncThunk(
  "transactions/fetchUserTransactions",
  async (userId, token) => {
    console.log(`eferfrgf${userId}`);
    console.log(`eferfrgf ${token}`);
    try {
      const response = await fetchData(
        `http://localhost:3001/api/transactions/user/${userId}`,
        "GET",
        null,
        {},
        token
      );
      return response;
    } catch (error) {
      return;
    }
  }
);
// Thunk to fetch user transactions
// export const fetchUserTransactions = createAsyncThunk(
//   "transactions/fetchUserTransactions",
//   async (userId, token) => {
//     console.log(token);
//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/transactions/user/${userId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch transactions");
//       }

//       const data = await response.json();
//       console.log("Fetched Data:", data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching transactions:", error.message);
//       return;
//     }
//   }
// );
const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserTransactions.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(state.data);
    });
  },
});

export const selectTransactions = (state) => state.transactions.data;

export default transactionsSlice.reducer;
