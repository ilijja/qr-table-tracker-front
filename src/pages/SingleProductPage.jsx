import { redirect } from "react-router-dom";
import { getAuthToken } from "../util/auth";

export async function action({ params, request }) {
  const token = getAuthToken();

  if (!token) {
    return redirect("/login");
  }

  const menuId = params.id;

  const formData = await request.formData();
  const method = request.method;

  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
  };

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const path = "http://localhost:8080/menu/product";

  if (method === "POST") {
    data.categoryId = formData.get("categoryId")
  }
  
  if(method === "PUT"){
    data.productId = formData.get("productId")
  }

  options.body = JSON.stringify(data);

  const response = await fetch(path, options);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const result = await response.json();

  return redirect(`/products/${menuId}`);
}
