import { useContext } from "react";
import ProductContext from "../../store/ProductContext";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

const MenuItems = () => {
  const { menus } = useContext(ProductContext);
  const navigate = useNavigate();

  const menuItemClickHandler = (menuId) => {
    navigate(`${menuId}`)
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-6 lg:max-w-7xl ">
        <ul role="list" className="divide-y divide-gray-200 ">
          <li>

          {menus.map((menu) => (
            <MenuItem
              onClick={() => menuItemClickHandler(menu._id)}
              key={menu._id}
              menuId={menu._id}
              menuName={menu.name}
            />
          ))}
          </li>
        </ul>
        
      </div>

    </div>
  );
};

export default MenuItems;
