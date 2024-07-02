import { Form, useParams } from "react-router-dom";
import UserProgressContext from "../../store/UserProgressContext";
import Modal from "../Modal";
import Input from "../Input";
import { Dialog } from "@headlessui/react";
import { useContext } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSubmit } from "react-router-dom";

const AddProductForm = (props) => {
  const userProgressCtx = useContext(UserProgressContext);
  const submit = useSubmit()

  const params = useParams()

  const currentProduct = userProgressCtx.currentProduct;
  const method = userProgressCtx.currentProductMethod;

  const closeModalMenu = () => {
    userProgressCtx.hideAddProduct();
  };

  const onDeleteButtonHandler = () => {
    submit(null, { method: "DELETE", action: `/products/${params?.id}/deleteProduct/${currentProduct._id}` });
    closeModalMenu()
  }

  return (
    <Modal
      open={userProgressCtx.progress === "product"}
      onClose={closeModalMenu}
    >
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
        <Form method={method} action="addProduct" encType="multipart/form-data">
          <div className="flex flex-col gap-4 text-left sm:mt-1">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900"
            >
              {method === "PUT" ? "Update product" : "Add product"}
            </Dialog.Title>

            <div className="mt-1">
              {
                <Input
                  label="Product Name"
                  id="name"
                  name="name"
                  for="name"
                  type="text"
                  defaultValue={method === "PUT" ? currentProduct.name : ""}
                  placeholder="Product 1"
                />
              }
            </div>

            <div className="mt-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={method === "PUT" ? currentProduct.price : ""}
                  className="block w-full outline-none rounded-md border-0 py-1.5 pl-3 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                  aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    RSD
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product description
              </label>
              <div className="mt-2">
                <textarea
                  rows={3}
                  name="description"
                  id="description"
                  className="block w-full rounded-md border-0 outline-none px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={
                    method === "PUT" ? currentProduct.description : ""
                  }
                />
              </div>
            </div>

            <div className="mt-1">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-6">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 sm:mt-2">
              <button
                type="submit"
                className="inline-flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={closeModalMenu}
              >
                {method === "PUT" ? "Update" : "Confirm"}
              </button>

              {method === "PUT" &&
              <button
              className="inline-flex mt-2 w-full justify-center rounded-md  bg-red-700 hover:bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={onDeleteButtonHandler}
              type='button'
            >
              Delete
            </button> }

             
            </div>

            
          </div>

          { method === "POST" && <input type="hidden" name="categoryId" value={props.categoryId} />}

          { method === "PUT" && <input type="hidden" name="productId" value={currentProduct._id} />}
         


        </Form>
      </Dialog.Panel>
    </Modal>
  );
};

export default AddProductForm;
