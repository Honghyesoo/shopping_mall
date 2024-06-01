import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeName(state) {
      return { ...state, name: "john" + state.name };
    },
    increase(state) {
      state.age += 1;
    },
  },
});

export let { changeName, increase } = user.actions;

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 0 },
    { id: 1, name: "Red Knit", count: 0 },
    { id: 2, name: "Grey Yordan", count: 0 },
  ],
  // 변경함수 파라미터에 넣은 자료들은 actiion.payload하면 자료가 나옴
  reducers: {
    changeCount(state, actions) {
      let idIndex = state.findIndex((item) => {
        return item.id === actions.payload;
      });
      state[idIndex].count += 1;
    },
    changeCount2(state, action) {
      let idIndex = state.findIndex((item) => item.id === action.payload);
      if (idIndex !== -1 && state[idIndex].count > 0) {
        state[idIndex].count -= 1;
      }
    },
    //장바구니 추가
    addCart(state, action) {
      console.log(action);
      const itemInCart = state.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.count += 1;
      } else state.push({ ...action.payload, count: 1 });
    },
    //장바구니 삭제
    deleteCart(state, action) {
      return state.filter((cart) => cart.id !== action.payload);
    },
  },
});

export let { changeCount, addCart, changeCount2, deleteCart } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
