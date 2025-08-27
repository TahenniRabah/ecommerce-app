import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: undefined,
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export function getProductsList() {
  return function (dispatch, ) {
    fetch("http://127.0.0.1:8000/api/product/")
      .then((res) => res.json())
      .then((data) => dispatch(addProducts(data)));
  };
}

export const { addProducts } = products.actions;
export default products.reducer;
