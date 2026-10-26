import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, deleteItem, getPizzaQuantityById } from "../cart/cartSlice";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const quantityInCart = useSelector(getPizzaQuantityById(id));
  function addToCart() {
    const myPizza = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: 1 * unitPrice,
    };
    dispatch(addItem(myPizza));
  }

  function deleteCartItem() {
    dispatch(deleteItem(id));
  }

  return (
    <li className="flex gap-2 py-2">
      <img
        src={imageUrl}
        alt={name}

        className={`h-24 w-auto ${soldOut ? "opacity-60 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut ? (
            quantityInCart ? (
              <Button type="small" onClick={deleteCartItem}>
                Delete
              </Button>
            ) : (
              <Button type="small" onClick={addToCart}>
                Add to cart
              </Button>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
