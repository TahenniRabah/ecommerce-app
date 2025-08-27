import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { whoAmI } from "../features/user";
import { useEffect } from "react";

export default function UserInfo() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.logged) {
      dispatch(whoAmI());
    }
  }, [dispatch, user]);

  return (
    user.name && (
      <div className="fixed z-20 top-0 right-0 text-white p-2">{user.name}</div>
    )
  );
}
