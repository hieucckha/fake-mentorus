import React, { FC, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import userService from '../services/user.service';
interface EditUserProps {
  // eslint-disable-next-line jsdoc/require-jsdoc
  handleCloseModalEditUser: () => void;
}

const EditUser: FC<EditUserProps> = ({ handleCloseModalEditUser }): JSX.Element => {
  const [userId, setUserId] = useState<number>();
  const [formData, setFormData] = useState({
    name: '',
    sex: true,
    email: '',
  });
  useEffect(() => {
    /**
     * Get user profile.
     */
    async function getProfile() {
      const user = await userService.getProfile();

      setUserId(user.id);

      setFormData({
        name: user.name,
        sex: user.sex,
        email: user.email,
      });
    }

    getProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add your logic to handle form submission (e.g., send data to the server)
    if (userId !== undefined) {
      userService.updateProfile(userId, formData);
    }

    // After submitting, you may want to close the modal
    handleCloseModalEditUser();
  };

  const handleCloseModal = (): void => {
    setFormData({
      name: '',
      sex: true,
      email: '',
    });
    handleCloseModalEditUser();
  };

  return (
    <Transition show={true} as={React.Fragment}>
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

          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          {/* This is the actual modal */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"

          >
            <form onSubmit={handleSubmit}>
              <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-md w-full">
                <Dialog.Title className="text-lg font-medium text-gray-900 p-4">
                  Update User Information
                </Dialog.Title>
                <Dialog.Description className="p-4 text-sm text-gray-500">
                  Fill out the form to update your information.
                </Dialog.Description>

                <div className="p-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-primary-600 focus:border-primary-600 bg-white"
                  />
                </div>

                <div className="p-4">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-900">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.sex.toString()}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-primary-600 focus:border-primary-600 bg-white"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="p-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-primary-600 focus:border-primary-600 bg-white"
                  />
                </div>

                <div className="flex justify-end p-4">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 mr-2"
                    onClick={() => handleCloseModal()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditUser;
