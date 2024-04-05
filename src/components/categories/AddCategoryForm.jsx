import { Form } from "react-router-dom";
import { useParams } from "react-router-dom";
import UserProgressContext from "../../store/UserProgressContext";
import Modal from "../Modal";
import Input from "../Input";
import { Dialog } from "@headlessui/react";
import { useContext } from "react";

const AddCategoryForm = () => {

  const userProgressCtx = useContext(UserProgressContext);
  const params = useParams()

  const category = userProgressCtx.currentCategory;
  const method = userProgressCtx.currentCategoryMethod;

  const id = params.id

  const closeModalMenu = () => {
    userProgressCtx.hideAddCategory()
  };

  return (
    <Modal
      open={userProgressCtx.progress === "category"}
      onClose={closeModalMenu}
    >
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
        <Form method={method}>
          <div>
            <div className=" text-left sm:mt-1">
              <Dialog.Title
                as="h3"
                className="text-base font-semibold leading-6 text-gray-900"
              >
                {method === "PUT" ? "Edit Category" : "Add Category" }
              </Dialog.Title>

              <div className="mt-2">
                {
                  <Input
                    label="Category Name"
                    id="name"
                    name="name"
                    for="name"
                    type="text"
                    placeholder="Category 1"
                    defaultValue={method === "PUT" ? category?.name : "" }
                  />
                }
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={closeModalMenu}
            >
              {method === "PUT" ? "Update" : "Confirm" }
            </button>
          </div>


          { method === "PUT" && <input type="hidden" name="categoryId" value={category?._id} />}

        </Form>
      </Dialog.Panel>
    </Modal>
  );
};

export default AddCategoryForm;
