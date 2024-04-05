import { redirect, useParams } from "react-router-dom";
import AddCategory from "../components/categories/AddCategory";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import ProductContext from "../store/ProductContext";

const MenuPage = () => {
  const {categories, products} = useLoaderData();
  
  const {setCategories, setProducts} = useContext(ProductContext)

  useEffect(() => {
    setCategories(categories)
    setProducts(products)
  },[setCategories, setProducts, categories, products])


  return <AddCategory />;
};

export default MenuPage;

export async function action({ params, request }) {
  const menuId = params.id;
  const method = request.method;

  const formData = await request.formData();
  const token = getAuthToken();

  let path = "http://localhost:8080/menu";

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
      menuId: menuId,
    };
    options.body = JSON.stringify(data);
    path += "/category";
  }

  if( method === "PUT"){
    const data = {
        name: formData.get("name"),
        menuId: menuId,
      };
      options.body = JSON.stringify(data);
      const categoryId = formData.get('categoryId')
      path += `/category/${categoryId}`;
  }

  if (method === "DELETE") {
    path += `/${menuId}`;
  }

  const response = await fetch(path, options);

  if (!response.ok) {
    throw new Error("Something went wrong with adding category");
  }

  const result = await response.json();

  switch (method) {
    case "DELETE":
      return redirect("/products");
    case "POST":
        return redirect(``);
    default: 
        return null
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
  let categories = []
  let products = []

  result.map((menu) => {
    categories.push({menuId: menu._id, menuName: menu.name, categories: menu.categories})
  })

  result.forEach(menu => {
    menu.categories.forEach(category => {
      category.products.forEach(product => {
        products.push({...product});
      });
    });
  });

  return {categories, products};
}
