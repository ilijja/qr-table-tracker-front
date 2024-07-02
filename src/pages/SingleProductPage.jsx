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

  // Prikupljanje podataka iz forme
  // const data = {
  //   name: formData.get("name"),
  //   description: formData.get("description"),
  //   price: formData.get("price"),
  //   image: formData.get("image") 
  // };

  const options = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const path = "http://localhost:8080/menu/product";

  options.body = formData

  const response = await fetch(path, options);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const result = await response.json();

  return redirect(`/products/${menuId}`);
}
