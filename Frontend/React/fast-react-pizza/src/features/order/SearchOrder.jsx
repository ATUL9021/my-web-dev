import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  function handleOnSumbit(e) {
    e.preventDefault();
    if (!searchQuery) return;

    navigate(`order/${searchQuery}`);
    setSearchQuery("");
  }
  return (
    <form onSubmit={handleOnSumbit}>
      <input
        className="rounded-full p-2 text-sm placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1 sm:w-72"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="search an order"
      />
    </form>
  );
}

export default SearchOrder;
