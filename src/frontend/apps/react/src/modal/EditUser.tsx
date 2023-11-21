import React, { FC, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import userService from '../services/user.service';
interface EditUserProps {
  // eslint-disable-next-line jsdoc/require-jsdoc
  handleCloseModalEditUser: () => void;
  openModal: boolean;
}

const EditUser: FC<EditUserProps> = ({ handleCloseModalEditUser, openModal }): JSX.Element => {
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
   <Modal show={openModal} size="md" onClose={handleCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                // value={email}
                // onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-cyan-700 hover:underline dark:text-cyan-500">
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  );
};

export default EditUser;
