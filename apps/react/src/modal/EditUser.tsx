import React, { FC, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface EditUserProps {
  // eslint-disable-next-line jsdoc/require-jsdoc
  handleCloseModalEditUser: () => void;
}

const EditUser: FC<EditUserProps> = ({ handleCloseModalEditUser }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = (): void => {
    setIsOpen(false);
    handleCloseModalEditUser();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => handleCloseModal()}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          {/* This is the actual modal */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-md w-full">
              <Dialog.Title className="text-lg font-medium text-gray-900 p-4">
                Deactivate account
              </Dialog.Title>
              <Dialog.Description className="p-4 text-sm text-gray-500">
                This will permanently deactivate your account. Are you sure you want to proceed?
              </Dialog.Description>

              <div className="flex justify-end p-4">
                <button
                  className="text-gray-600 hover:text-gray-800 mr-2"
                  onClick={() => handleCloseModal()}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
                  onClick={() => handleCloseModal()}
                >
                  Deactivate
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUser;
