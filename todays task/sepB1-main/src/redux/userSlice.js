import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  trips: [],
  reservations: [],
  cart: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    resetUsers: (state) => {
      state.users = [];
    },
    addTrip: (state, action) => {
      state.trips.push(action.payload);
    },
    updateTrip: (state, action) => {
      const index = state.trips.findIndex((trip) => trip.id === action.payload.id);
      if (index !== -1) state.trips[index] = action.payload;
    },
    deleteTrip: (state, action) => {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
    },
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
    updateReservation: (state, action) => {
      const index = state.reservations.findIndex((reservation) => reservation.id === action.payload.id);
      if (index !== -1) state.reservations[index] = action.payload;
    },
    deleteReservation: (state, action) => {
      state.reservations = state.reservations.filter((reservation) => reservation.id !== action.payload);
    },
    addToCart: (state, action) => {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.cart.push({ ...action.payload, quantity: 1 });
    },
    changeCartQuantity: (state, action) => {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload.id);
      if (!item) return;
      item.quantity += action.payload.change;
      if (item.quantity <= 0) state.cart = state.cart.filter((cartItem) => cartItem.id !== action.payload.id);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addUser, resetUsers, addTrip, updateTrip, deleteTrip, addReservation, updateReservation, deleteReservation, addToCart, changeCartQuantity, removeFromCart } = userSlice.actions;
export default userSlice.reducer;
