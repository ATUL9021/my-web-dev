import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";
import UpdateCartItemQuantity from "./UpdateCartItemQuantity";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  function deleteCartItem() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <li className="gap-3 py-3 sm:flex sm:items-center">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-5 sm:flex-grow sm:justify-end">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateCartItemQuantity pizzaId={pizzaId} />
        <Button type="small" onClick={deleteCartItem}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
