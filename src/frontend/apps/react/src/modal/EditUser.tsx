import React, { FC, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

import { useQueries, useQuery } from '@tanstack/react-query';

import userService from '../services/user.service';
import useAuth from '../hooks/auth';
import { UserProfileDto } from '../api/store/auth/interface';
import useAuthQuery from '../api/store/auth/queries';

interface EditUserProps {
  // eslint-disable-next-line jsdoc/require-jsdoc
  handleCloseModalEditUser: () => void;
  openModal: boolean;
}

const EditUser: FC<EditUserProps> = ({ handleCloseModalEditUser, openModal }): JSX.Element => {
  const [userId, setUserId] = useState<number>();
  const [formData, setFormData] = useState<{
    name: string;
    studentId: string;
    email: string;
  }>({
    name: '',
    studentId: '',
    email: '',
  });

  const { data: user, isLoading } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    /**
     * Get user profile.
     */
    setUserId(user?.id);

    setFormData({
      name: user?.fullName ?? '',
      studentId: user?.studentId ?? '',
      email: user?.email ?? '',
    });

  }, [user]);

  if (isLoading) {
    return <></>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCloseModalEditUser();
  };

  const handleCloseModal = (): void => {
    handleCloseModalEditUser();
  };

  return (
    <Modal show={openModal} size="md" onClose={handleCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit profile </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              placeholder="Nguyen Van A"

              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Name" />
            </div>
            <TextInput
              id="name"
              placeholder="Nguyen Van A"

              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="studentId" value="StudentId" />
            </div>
            <TextInput
              id="studentId"
              placeholder="3043465"

              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full text-center flex justify-end">
            <Button onClick={handleSubmit}>Update</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditUser;
