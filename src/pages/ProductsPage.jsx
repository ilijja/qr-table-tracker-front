import { json, redirect } from "react-router-dom";
import MenuPage from "../components/menu/Menu";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";
import ProductContext from "../store/ProductContext";
import { useContext, useEffect } from "react";

const Products = () => {
  const data = useLoaderData();
  const { setMenus, addCategories, menus} = useContext(ProductContext);

  useEffect(() => {
    if (data) {
      setMenus(data);
      let categories = []
        
      menus.map(menu => {
        categories = [...categories, {menuId: menu._id, menuName: menu.name, categories: menu.categories}]
      })

      addCategories(categories)   
    }
  }, [data, setMenus, menus, addCategories]);

  return <MenuPage />;
};

export default Products;

export async function action({ params, request }) {
  const formData = await request.formData();

  const method = request.method;
  let path = "http://localhost:8080/menu";

  const token = getAuthToken();

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (method === "POST") {
    const data = {
      name: formData.get("name"),
    };
    options.body = JSON.stringify(data);
  }

  const response = await fetch(path, options);

  if (!response.ok) {
    throw new Error("bad request");
  }

  const result = await response.json();

  switch (method) {
    case "POTS":
      return redirect(`${result._id}`);
    case "DELETE":
      return redirect("products");
    default:
      return result;
  }
}

export async function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch("http://localhost:8080/menu/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const result = await response.json();
  return result;
}
