import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((store) => store.cart.cart);
  const isSubmitting = useNavigation().state === "submitting";
  const formError = useActionData();
  const {
    userName,
    status: addressStatus,
    address,
    position,
    error,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const dispatch = useDispatch();
  if (cart.length == 0) return <EmptyCart />;
  return (
    <div className="px-6 py-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* <Form method='POST' action="fullurl/order/new"> below one is same react router will match with that url */}
      <Form method="POST">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="basis-[10em]">First Name</label>
          <input
            className="input flex-grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="">Phone number</label>
          <div className="flex-grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && <p>{error}</p>}
          </div>
        </div>

        <div className="relative mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="">Address</label>
          <div className="flex-grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && <p>{formError.phone}</p>}
          </div>
          {!address && (
            <span className="absolute right-1">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get location
              </Button>
            </span>
          )}
        </div>

        <div className="mb-4 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-500"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={position ? `${position.latitude},${position.longitude}` : ""}
          />
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? "placing order" : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on" ? true : false,
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "please write correct phone number we will need it to contact you";
  }

  if (Object.keys(errors).length > 0) {
    console.log("eeerr");
    return errors;
  }

  //if everything is okay
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
