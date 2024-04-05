import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const BottomModal = ({ children, title, showSplitModal, hideSplitModal, background}) => {
    
  const onCloseModal = () => {
    hideSplitModal();
  };

  return (
    <Transition.Root show={showSplitModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex justify-center items-end"
        onClose={onCloseModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className={`w-full h-auto rounded-b-none rounded-3xl  shadow-xl overflow-hidden transform transition ${background? `bg-${background}` : 'bg-white'}`}>
            <Dialog.Panel>
              {title && <div className="p-4">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  {title}
                  <button onClick={onCloseModal} className="float-right">
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Dialog.Title>
              </div>}

                {children}

            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default BottomModal;
