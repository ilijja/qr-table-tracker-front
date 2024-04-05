import { useLoaderData } from "react-router-dom";
import MenuView from "../components/user/MenuView";
import { useContext, useEffect } from "react";
import CartContext from "../store/CartContext";

const OrderMenuPage = () => {
  const data = useLoaderData();

  const { clearCartItems } = useContext(CartContext);

  useEffect(() => {
    clearCartItems();
  }, [data]);

  return <MenuView menu={data} />;
};

export default OrderMenuPage;

export async function loader({ params }) {
  const menuId = params.menuId;

  const response = await fetch(`http://localhost:8080/guest/menu/${menuId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const result = await response.json();

  return result;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const tableId = params.id;
  const cartItems = JSON.parse(formData.get("items"));

  const data = {
    cartItems: cartItems,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `http://localhost:8080/order/${tableId}`,
    options
  );

  if (!response.ok) {
    throw new Error("Sth went wrong");
  }

  const result = await response.json();


  return null;
}
