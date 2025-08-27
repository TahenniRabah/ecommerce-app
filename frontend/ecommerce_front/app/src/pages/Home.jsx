import React from "react";
import ProductsList from "../components/ProducstList";
import UserInfo from "../components/UserInfo";
export default function Home() {
  return (
    <div>
      <div className=" bg-slate-800 min-h-screen ">
        <div className="max-w-4xl mx-auto  px-4">
          <h1 className="text-2xl text-slate-100 mb-6">
            Here are our products
          </h1>
          <ProductsList />
        </div>
        <UserInfo />
      </div>
    </div>
  );
}
