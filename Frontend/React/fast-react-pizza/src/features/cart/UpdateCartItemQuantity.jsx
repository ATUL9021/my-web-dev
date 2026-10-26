import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateCartItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  function increase() {
    dispatch(increaseItemQuantity(pizzaId));
  }

  function decrease() {
    dispatch(decreaseItemQuantity(pizzaId));
  }
  return (
    <div className="flex gap-2">
      <Button onClick={increase} type="small">
        +
      </Button>
      <Button onClick={decrease} type="small">
        -
      </Button>
    </div>
  );
}

export default UpdateCartItemQuantity;
