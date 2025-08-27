import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/user";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handlesubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setName("");
  };
  return (
    <div>
      <div className=" bg-slate-800   ">
        <div className="flex flex-col justify-center bg-gray-600 text-white border rounded-4xl w-96 mx-auto p-4">
          <p className="flex justify-center text-4xl pt-4 pb-4 ">Sign up</p>
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
            <label htmlFor="name">Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded  p-2  my-2"
              placeholder="name..."
              type="text"
              id="name"
              name="name"
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
              onClick={() => dispatch(createUser({ email, name, password }))}
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
