import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: undefined,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartList: (state, action) => {
      state.items = action.payload;
    },
    editQuantity: (state, action) => {
      state.items.find(
        (el) => el.id === action.payload.cart_instance_id
      ).quantity = action.payload.value;
    },
    removeItem: (state, action) => {
      const indexOfItemToRemove = state.items.findIndex(
        (el) => el.id === action.payload
      );
      state.items.splice(indexOfItemToRemove, 1);
    },
  },
});

export function getCartList() {
  return function (dispatch, getState) {
    const token = getState().user.token;
    axios
      .get("http://127.0.0.1:8000/api/cart/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => dispatch(cartList(data)));
  };
}
export function addItem(action) {
  const payload = action;
  return function (dispatch, getState) {
    const token = getState().user.token;
    axios
      .post(
        `http://127.0.0.1:8000/api/cart/`,
        { quantity: 1, product_id: payload.product_id },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => dispatch(getCartList()))
      .catch((err) => err.message);
  };
}

export function deleteItem(action) {
  const payload = action;
  return function (dispatch, getState) {
    const token = getState().user.token;
    axios
      .delete(`http://127.0.0.1:8000/api/cart/${payload}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => dispatch(removeItem(action)))
      .catch((err) => err.message);
  };
}
export function updateQuantity(action) {
  const payload = action;
  return function (dispatch, getState) {
    const token = getState().user.token;
    if (payload.value > 0 && payload.value < 10) {
      console.log(payload.value);
      dispatch(editQuantity(action));
      axios
        .put(
          `http://127.0.0.1:8000/api/cart/${payload.cart_instance_id}/`,
          {
            quantity: payload.value,
            product_id: payload.product_id,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .catch((err) => console.log(err.response.request.responseText));
    }
  };
}

export const { cartList, editQuantity, removeItem } = cart.actions;
export default cart.reducer;
