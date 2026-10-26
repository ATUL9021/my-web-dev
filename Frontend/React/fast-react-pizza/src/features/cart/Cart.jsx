import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector((store) => store.cart.cart);
  const userName = useSelector((state) => state.user.userName);

  const dispatch = useDispatch();
  function clearMyCart() {
    dispatch(clearCart());
  }

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="p-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mb-4 mt-7 text-xl font-bold">Your cart, {userName}</h2>
      <ul className="mb-4 divide-y divide-stone-400 border-b-[0.01rem] border-stone-400">
        {cart.map((cartItem) => {
          return <CartItem item={cartItem} key={cartItem.pizzaId} />;
        })}
      </ul>
      <div className="flex justify-between">
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondary" onClick={clearMyCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
