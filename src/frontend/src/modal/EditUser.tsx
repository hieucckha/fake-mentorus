/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type FC, useEffect } from "react";
import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";

import useAuth from "../hooks/auth";
import type { UserProfileDto, editUserDto } from "../api/store/auth/interface";
import { userUpdateProfileMutation } from "../api/store/auth/mutations";

interface EditUserProps {
	handleCloseModalEditUser: () => void;
	openModal: boolean;
}

const EditUser: FC<EditUserProps> = ({
	handleCloseModalEditUser,
	openModal,
}): JSX.Element => {
	const [formData, setFormData] = useState<UserProfileDto>({
		fullName: "",
		lastName:"",
		firstName:"",
		studentId: "",
		email: "",
		id: 0,
		role: "",
	});

	const { data: user, isLoading } = useAuth();

	useEffect(() => {
		if (!user) {
			return;
		}

		/**
		 * Get user profile.
		 */

		setFormData({
			fullName: user?.fullName ?? "",
			lastName: user?.lastName ?? "",
			firstName: user?.firstName ?? "",
			studentId: user?.studentId ?? "",
			email: user?.email ?? "",
			id: user?.id ?? null,
			role: ""
		});
	}, [user]);

	if (isLoading) {
		return <></>;
	}

	const handleChange = (error: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[error.target.id]: error.target.value,
		});
	};

	const updateProfile = userUpdateProfileMutation();

	const handleSubmit = (error: React.FormEvent) => {
		error.preventDefault();
		const data : editUserDto ={
			firstName: formData.firstName,
			lastName: formData.lastName,
			studentId: formData.studentId,
			email: formData.email,
		}
		updateProfile.mutate(data, {
			onSuccess() {
				handleCloseModalEditUser();
			},
			onError(error:any) {
				console.error(error);
				Toast({
					title: "Fail",
					duration: 500,
				});
			},
		});
	};

	const handleCloseModal = (): void => {
		handleCloseModalEditUser();
	};

	return (
		<Modal show={openModal} size="md" onClose={handleCloseModal} popup>
			<Modal.Header />
			<Modal.Body>
				<div className="space-y-6">
					<h3 className="text-xl font-medium text-gray-900 dark:text-white">
						Edit profile{" "}
					</h3>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="email" value="Email" />
						</div>
						<TextInput
							id="email"
							placeholder="example@gnail.com"
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
							value={formData.fullName}
							// onChange={handleChange}
							disabled
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="First Name" />
						</div>
						<TextInput
							id="firstName"
							placeholder="Nguyen"
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Last Name" />
						</div>
						<TextInput
							id="lastName"
							placeholder="Van A"
							value={formData.lastName}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={formData.role !== "Student" ? "" : "hidden"}>
						<div className="mb-2 block" >
							<Label htmlFor="studentId" value="Student Id" />
						</div>
						<TextInput
							id="studentId"
							placeholder="20127001"
							value={formData.studentId}
							onChange={handleChange}
							// required
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
