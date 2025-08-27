import { useSelector, useDispatch } from "react-redux";
import { getCartList } from "../features/cart";
import { useEffect } from "react";
import CartItem from "../components/CartItem";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.logged) {
      dispatch(getCartList());
    }
  }, [dispatch, user]);

  return (
    <div className="bg-slate-300 text-slate-900 min-w-[400px] md:min-w-[700px] px-10 pt-10 pb-6 rounded border border-slate-600 mb-[10vh] mx-20">
      {user.logged ? (
        <div>
          <ul>
            {cart.items &&
              cart.items.map((el) => {
                return <CartItem el={el} key={el.id} />;
              })}
          </ul>
          <p className="text-xl">
            Your total :
            <span className="mx-2 font-semibold">
              {cart.items &&
                Number.parseFloat(
                  cart.items.reduce(
                    (total, current) =>
                      total + current.product.price * current.quantity,
                    0
                  )
                ).toFixed(2)}
              $
            </span>
          </p>
          <button className="block mx-auto bg-slate-800 text-slate-200 rounded px-4 py-2 mt-7">
            Proceed to checkout
          </button>
        </div>
      ) : (
        <div className="mb-4">
          please login to add some products to your cart...
        </div>
      )}
    </div>
  );
}
