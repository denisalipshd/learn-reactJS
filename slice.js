import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
  },
});

const loginSlice = createSlice({
  name: "login",
  initialState: { status: false },
  reducers: {
    login(state, action) {
      state.status = true;
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    login: loginSlice.reducer,
  },
});
console.log("oncreate store : ", store.getState());

store.subscribe(() => {
  console.log("onchange store : ", store.getState());
});

store.dispatch(cartSlice.actions.addToCart({ id: 1, qty: 1 }));
store.dispatch(loginSlice.actions.login());
