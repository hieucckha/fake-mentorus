/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type FC, useEffect } from "react";
import { Link } from "react-router-dom";

import localStorageService from "../services/localStorage.service";
import EditUser from "../modal/EditUser";
import useAuth from "../hooks/auth";
import CreateClass from "../modal/CreateClass";
import JoinClass from "../modal/JoinClass";
import { QueryClient } from "@tanstack/react-query";

/**
 * Navigation bar.
 */
const NavBarLogin: FC = () => {
	const queryClient = new QueryClient();
	const [isOpenModalEditUser, setIsOpenModalEditUser] = useState(false);
	const [isOpenModalCreateClass, setIsOpenModalCreateClass] = useState(false);
	const [isOpenModalJoinClass, setIsOpenModalJoinClass] = useState(false);
	const [profile, setProfile] = useState<{ name: string; email: string }>({
		name: "",
		email: "",
	});
	const handleSignOut = async () => {
		const token = localStorageService.getItem("auth");
		await queryClient.clear();
		await queryClient.removeQueries();
		if (token !== null) {
			localStorageService.removeItem("auth");
		}
	};
	const handleOpenModalEditUser = (): void => {
		setIsOpenModalEditUser(true);
	};
	const handleCloseModalEditUser = (): void => {
		setIsOpenModalEditUser(false);
	};

	const handleCloseModalCreateClass = (): void => {
		setIsOpenModalCreateClass(false);
	};
	const handleOpenModalCreateClass = (): void => {
		setIsOpenModalCreateClass(true);
	};
	const handleCloseModalJoinClass = (): void => {
		setIsOpenModalJoinClass(false);
	};
	const handleOpenModalJoinClass = (): void => {
		setIsOpenModalJoinClass(true);
	};
	const { data: user } = useAuth();

	useEffect(() => {
		if (!user) {
			return;
		}

		/**
		 * Get user profile.
		 */
		setProfile({
			name: user?.fullName ?? "",
			email: user?.email ?? "",
		});
	}, [user]);
	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start rtl:justify-end">
						<button
							type="button"
							className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						>
							<span className="sr-only">Open sidebar</span>
							<svg
								className="w-6 h-6"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clipRule="evenodd"
									fillRule="evenodd"
									d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
								/>
							</svg>
						</button>
						<Link to={"/home"} className="flex ms-2 md:me-24">
							<img
								src="/icons/ssandwich.ico"
								className="h-8 me-3"
								alt="FlowBite Logo"
							/>
							<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
								Classroom
							</span>
						</Link>
					</div>
					<div className="flex items-center">
						{user?.role === "Teacher" ? (
							<button
							type="button"
							className="flex text-sm  rounded-full focus:bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
							aria-expanded="false"
							onClick={handleOpenModalCreateClass}
						>
							<span className="sr-only">Create class</span>
							<svg
								focusable="false"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								className="hover:ring-gray-200 dark:hover:ring-gray-300 w-8 h-8"
							>
								<path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z" />
							</svg>
						</button>
						) : (
							<button
							type="button"
							className="flex text-sm  rounded-full focus:bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
							aria-expanded="false"
							onClick={handleOpenModalJoinClass}
						>
							<span className="sr-only">Join class</span>
							<svg
								focusable="false"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								className="hover:ring-gray-200 dark:hover:ring-gray-300 w-8 h-8"
							>
								<path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z" />
							</svg>
						</button>)
							
						}
						<div className="flex items-center ms-3">
							<div>
								<button
									type="button"
									className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
									aria-expanded="false"
									data-dropdown-toggle="dropdown-user"
								>
									<span className="sr-only">Open user menu</span>
									<img
										className="w-8 h-8 rounded-full"
										src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
										alt="user photo"
									/>
								</button>
							<div
								className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
								id="dropdown-user"
							>
								<div className="px-4 py-3" role="none">
									<p
										className="text-sm text-gray-900 dark:text-white"
										role="none"
									>
										{profile.name}
									</p>
									<p
										className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
										role="none"
									>
										{profile.email}
									</p>
								</div>
								<ul className="py-1" role="none">
									<li>
										<Link
											to={"/home"}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
										>
											Dashboard
										</Link>
									</li>
									<li className=" hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
										{/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a> */}
										<button
											onClick={handleOpenModalEditUser}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
										>
											Settings
										</button>
									</li>
									<li>
										<Link
											to={"/"}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
											onClick={handleSignOut}
										>
											Sign out
										</Link>
									</li>
								</ul>
							</div>
							</div>

						</div>
						{isOpenModalEditUser && (
							<EditUser
								openModal={isOpenModalEditUser}
								handleCloseModalEditUser={handleCloseModalEditUser}
							/>
						)}
						{isOpenModalCreateClass && (
							<CreateClass
								openModal={isOpenModalCreateClass}
								handleCloseModalCreateClass={handleCloseModalCreateClass}
							/>
						)}
						{isOpenModalJoinClass && (
							<JoinClass
								openModal={isOpenModalJoinClass}
								handleCloseModalJoinClass={handleCloseModalJoinClass}
							/>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBarLogin;
