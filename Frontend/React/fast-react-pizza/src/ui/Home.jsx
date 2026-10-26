import { useDispatch, useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  console.log("M");
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="my-4 text-center sm:my-6">
      <h1 className="mb-8 text-center text-xl font-semibold text-stone-700">
        The best pizza.
        <br />
        <span className="text-3xl text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {!userName ? (
        <CreateUser />
      ) : (
        <Button to="menu" type="primary">
          go to menu
        </Button>
      )}
    </div>
  );
}

export default Home;
