import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <div className="flex justify-between border-b-2 border-blue-950 bg-yellow-500 px-4 py-4 uppercase sm:px-6">
      <Link to="/" className="tracking-normal">
        Fast react pizza co.
      </Link>
      <SearchOrder />
      <UserName />
    </div>
  );
}

export default Header;
