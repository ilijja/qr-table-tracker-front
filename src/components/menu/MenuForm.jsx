import { useContext } from "react";
import Modal from "../Modal";
import UserProgressContext from "../../store/UserProgressContext";
import Input from "../Input";
import { Dialog, Transition } from "@headlessui/react";
import { Form } from "react-router-dom";

const MenuForm = ({ showModal }) => {
  const userProgressCtx = useContext(UserProgressContext);

  const closeModalMenu = () => {
    userProgressCtx.hideAddMenu();
  };

  return (
    <Modal open={userProgressCtx.progress === "menu"} onClose={closeModalMenu}>
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
        <Form method="POST">
        <div>
          <div className=" text-left sm:mt-1">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900"
            >
              Add menu
            </Dialog.Title>

            <div className="mt-2">
              {
                <Input
                  label="Menu"
                  id="name"
                  name="name"
                  for="name"
                  type="text"
                  placeholder="Meni 1"
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
            Confirm
          </button>
        </div>
        </Form>
      </Dialog.Panel>
    </Modal>
  );
};

export default MenuForm;
