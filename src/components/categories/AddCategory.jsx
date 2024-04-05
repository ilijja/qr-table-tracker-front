import AddCategoryForm from "./AddCategoryForm";
import { useContext, useState } from "react";
import UserProgressContext from "../../store/UserProgressContext";
import { useParams, useSubmit } from "react-router-dom";
import ProductContext from "../../store/ProductContext";
import Category from "./Category";
import RightContainer from "../RightContainer";
import AddProductForm from "./AddProductForm";

const AddCategory = () => {
  const userProgressCtx = useContext(UserProgressContext);
  const { categories, products } = useContext(ProductContext);
  const submit = useSubmit();
  const params = useParams();
  const id = params.id;

  const cats = categories.find((item) => item.menuId === id)?.categories || [];
  const menuName =
    categories.find((item) => item.menuId === id)?.menuName || null;

  const [currentCat, setCurrentCat] = useState("");

  const deleteMenu = () => {
    submit(null, { method: "DELETE", action: `/products/${id}` });
  };

  const onAddCategoryHandler = () => {
    userProgressCtx.setCurrentCategoryMethod("POST");
    userProgressCtx.showAddCategory();
  };

  const onDeleteCategoryHandler = (category) => {
    submit(null, {
      method: "DELETE",
      action: `/products/${id}/deleteCategory/${category._id}`,
    });
  };

  const onEditCategoryHandler = (category) => {
    userProgressCtx.setCurrentCategoryMethod("PUT");
    userProgressCtx.setCurrentCategory(category);
    userProgressCtx.showAddCategory();
  };

  const addProductHandler = (id) => {
    userProgressCtx.setCurrentProductMethod("POST");
    userProgressCtx.showAddProduct();
    setCurrentCat(id);
  };

  return (
    <>
      <RightContainer>
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h1 className="text-2xl font-semibold leading-1 text-gray-900">
                {menuName}
              </h1>
              <p className="mt-1 text-sm text-gray-500"></p>
            </div>

            <div className="ml-4 mt-4 flex-shrink-0">
              <div>
                <button
                  type="button"
                  onClick={onAddCategoryHandler}
                  className="relative mx-1 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Category
                </button>

                <button
                  type="button"
                  onClick={deleteMenu}
                  className="relative mx-1 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Delete Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </RightContainer>

      {cats.map((item) => (
        <div className=" my-3" key={item._id}>
          <RightContainer>
            <Category
              category={item}
              onAddProduct={addProductHandler}
              onEditCategory={onEditCategoryHandler}
              onDeleteCategory={onDeleteCategoryHandler}
            />
          </RightContainer>
        </div>
      ))}

      <AddProductForm categoryId={currentCat} />
      <AddCategoryForm />
    </>
  );
};

export default AddCategory;
