import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartLength, getCartTotalPrice } from "./cartSlice";

function CartOverview() {
  const cartTotalPrice = useSelector(getCartTotalPrice);
  const cartLength = useSelector(getCartLength);
  if (cartLength == 0) return null;
  return (
    <div className="flex items-center justify-between bg-stone-700 p-4 align-middle font-semibold uppercase text-stone-50 sm:px-6">
      <p>
        <span>{cartLength} pizzas </span>
        <span>${cartTotalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
