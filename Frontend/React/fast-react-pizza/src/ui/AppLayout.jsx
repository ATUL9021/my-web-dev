import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();
  console.log(navigation, "  ", navigation.state);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {navigation.state === "loading" && <Loader />}

      <Header />
      <div className="max-w-full overflow-auto">
        <menu className="">
          <Outlet />
        </menu>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
