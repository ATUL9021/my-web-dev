import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
function Menu() {
  const menuData = useLoaderData();
  console.log("my", menuData);
  return (
    <ul className="p divide-y divide-stone-400">
      {menuData.map((menu) => {
        return <MenuItem pizza={menu} key={menu.id} />;
      })}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
