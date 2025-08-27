import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsList } from "../features/products";
import { getCartList } from "../features/cart";
import { addItem } from "../features/cart";
export default function ProductsList() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      dispatch(getCartList());
    }
    dispatch(getProductsList());
  }, []);
  return (
    <ul className="grid min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 auto-rows-[360px] ">
      {products.items &&
        products.items.map((el) => {
          return (
            <li
              key={el.id}
              className="flex flex-col items-center bg-slate-300 rounded"
            >
              <img className="w-56 h-56 my-4" src={`${el.image}`} alt="" />
              <div className="flex justify-between px-6 self-stretch mb-4">
                <p className=" text-lg">{el.name}</p>
                <span className=" font-bold">{el.price}</span>
              </div>

              {cart.items &&
              cart.items.find((item) => item.product.id === el.id) ? (
                <button className="rounded bg-green-700 w-56 h-10 ">
                  <p className="  text-white">Picked ✔</p>
                </button>
              ) : (
                <button
                  onClick={() => dispatch(addItem({ product_id: el.id }))}
                  className="rounded bg-slate-600 w-56 h-10 "
                >
                  <p className="text-white">Add to cart</p>
                </button>
              )}
            </li>
          );
        })}
    </ul>
  );
}
