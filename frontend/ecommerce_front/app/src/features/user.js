import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  name: undefined,
  email: undefined,
  token: undefined,
  logged: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.logged = true;
      state.token = action.payload;
      localStorage.setItem("Token", action.payload);
    },
    create: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    me: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export function getToken(action) {
  const payload = action;
  return function (dispatch, getState) {
    axios
      .post("http://127.0.0.1:8000/api/user/token/", {
        email: payload.email,
        password: payload.password,
      })
      .then((res) => res.data)
      .then((data) => {
        dispatch(login(data.token));
      });
  };
}

export function createUser(action) {
  const payload = action;
  return function (dispatch, getState) {
    axios
      .post("http://127.0.0.1:8000/api/user/create/", {
        email: payload.email,
        name: payload.name,
        password: payload.password,
      })
      .then((res) => res.data)
      .then((data) => dispatch(create(data)))
      .catch((err) => console.log(err.response.request.responseText));
  };
}

export function whoAmI() {
  return function (dispatch, getState) {
    const token = getState().user.token;
    axios
      .get("http://127.0.0.1:8000/api/user/me/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data)
      .then((data) => dispatch(me(data)));
  };
}

export const { login, create, me } = user.actions;

export default user.reducer;
