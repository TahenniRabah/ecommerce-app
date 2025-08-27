import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "../features/cart";

export default function CartItem({ el }) {
  const [quantity, setQuantity] = useState(el.quantity);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (quantity !== el.quantity) {
        if (Number(quantity) > 0) {
          dispatch(
            updateQuantity({
              cart_instance_id: el.id,
              value: Number(quantity),
              product_id: el.product.id,
            })
          );
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [quantity]);

  return (
    <li key={el.id} className="flex items-center mb-4">
      <img className="w-16 h-16 rounded" src={el.product.image} alt="image" />
      <p className="mr-auto ml-2 text-lg font-semibold">{el.product.name}</p>
      <input
        name="quantity"
        className="w-20 p-2 flex justify-center items-center rounded mr-4 bg-white"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button
        onClick={() => dispatch(deleteItem(el.id))}
        className="bg-slate-900 text-slate-200 px-2 inline-flex items-center justify-center rounded p-2"
      >
        Remove from cart
      </button>
    </li>
  );
}
