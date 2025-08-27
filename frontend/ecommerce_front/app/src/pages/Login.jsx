import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "../features/user";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handlesubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className=" bg-slate-800   ">
        <div className="flex flex-col justify-center bg-gray-600 text-white border rounded-4xl h-96 w-96 mx-auto p-4">
          <p className="flex justify-center text-4xl py-4">Login</p>
          <form onSubmit={handlesubmit} className="flex flex-col mx-4">
            <label htmlFor="email">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded  p-2  my-2"
              placeholder="email..."
              type="email"
              id="email"
              name="email"
            />
            <label htmlFor="password ">password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded  p-2  my-2"
              placeholder="password..."
              type="password"
              id="password"
              name="password"
            />
            <button
              onClick={() => dispatch(getToken({ email, password }))}
              className="border rounded mt-4 p-2 flex justify-center w-40 mx-auto"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
