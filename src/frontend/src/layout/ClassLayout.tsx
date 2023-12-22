import {
	MoreOutlined,
	PieChartOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps, message } from "antd";
import React, { useState } from "react";
import { useLocation, Link, useParams, Outlet } from "react-router-dom";
import classService from "../services/class.service";
import { AxiosError } from "axios";
import useAuth from "../hooks/auth";
import { UserRole } from "../api/store/auth/interface";
import UploadModal from "../modal/UploadModal";
import EditClass from "../modal/EditClassModal";

const ClassLayout: React.FC = (): JSX.Element => {
	const location = useLocation();
	const { id } = useParams<{ id: string }>();
	const { data: user } = useAuth();

	const overviewUrl = `/class/${id}/overview`;
	const classworkUrl = `/class/${id}/work-class`; 
	const gradeStructureUrl = `/class/${id}/grade-structure`;
	const gradeUrl = `/class/${id}/grade`;

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalEditVisible, setIsModalEditVisible] = useState(false);

	const chooseFile = () => {
		document.getElementById("importInput")?.click();
	};

	const handleCloseModal = () => {
		setIsModalVisible(false);
	};

	const handleCloseEditModal = () => {
		setIsModalEditVisible(false);
	};
	const handleSubmit = (e: any) => {
		classService
			.importStudent(id ?? "", e.target.files[0])
			.then(() => {
				message.success("Import success");
			})
			.catch((err: AxiosError) => {
				const mess = (err.response?.data as any).title ?? "Import failed";
				message.error(mess);
			});
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<a
					onClick={() => {
						setIsModalVisible(true);
					}}
				>
					<UploadOutlined className="pr-3" />
					Import grade
				</a>
			),
		},

		{
			key: "2",
			label: (
				<>
					<a onClick={chooseFile}>
						<UploadOutlined className="pr-3" />
						Import list student
						<input
							id="importInput"
							onChange={handleSubmit}
							type="file"
							className="hidden"
						></input>
					</a>
				</>
			),
		},
		// {
		// 	key: "3",
		// 	label: (
		// 		<>
		// 			<Link to={`../../Student_Template_Class.xlsx`}>
		// 				<DownloadOutlined className="pr-3" />
		// 				Export grade
		// 			</Link>
		// 		</>
		// 	),
		// },
	];

	const itemOverviews: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<a
					onClick={() => {
						setIsModalEditVisible(true);
					}}
				>
					{/* <UploadOutlined className="pr-3" /> */}
					Edit
				</a>
			),
		},
	];

	return (
		<div className="w-full h-screen-dvh">
			<div className="content-center dark:border-gray-700 mt-14">
				<section className="bg-white dark:bg-gray-900 h-screen content-center">
					<div className="border-b border-gray-200 dark:border-gray-700">
						<div className="flex flex-row justify-between ">
							<ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
								<li className="me-2">
									<Link
										defaultChecked
										to={overviewUrl}
										className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
											location.pathname === overviewUrl
												? "text-blue-600 dark:text-blue-500"
												: ""
										}`}
									>
										<svg
											className={`w-4 h-4 me-2 ${
												location.pathname === overviewUrl
													? "text-blue-600 dark:text-blue-500"
													: ""
											}`}
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
										</svg>
										Overview
									</Link>
								</li>
								<li className="me-2">
									<Link
										to={classworkUrl}
										className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
											location.pathname === classworkUrl
												? "text-blue-600 dark:text-blue-500"
												: ""
										}`}
									>
										<svg
											className="w-4 h-4 me-2 "
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 18 18"
										>
											<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
										</svg>
										Classwork
									</Link>
								</li>
								<li className="me-2">
									{user && user.role == UserRole.Teacher && (
										<Link
											to={gradeStructureUrl}
											className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
												location.pathname === gradeStructureUrl
													? "text-blue-600 dark:text-blue-500"
													: ""
											}`}
										>
											<svg
												className={`w-4 h-4 me-2  ${
													location.pathname === gradeStructureUrl
														? "text-blue-600 dark:text-blue-500"
														: ""
												}`}
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
											</svg>
											Grade structure
										</Link>
									)}
								</li>
								<li className="me-2">
									<Link
										to={gradeUrl}
										className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
											location.pathname === gradeUrl
												? "text-blue-600 dark:text-blue-500"
												: ""
										}`}
									>
										<PieChartOutlined className="p-1" />
										Grade
									</Link>
								</li>
							</ul>
							{location.pathname === gradeStructureUrl && (
								<div className="me-2 right-0 text-2xl inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group ">
									<Dropdown menu={{ items }} placement="topRight">
										<MoreOutlined />
									</Dropdown>
								</div>
							)}
							{location.pathname === overviewUrl && (
								<div className="me-2 right-0 text-2xl inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group ">
									<Dropdown
										menu={{ items: itemOverviews }}
										placement="bottomRight"
									>
										<MoreOutlined />
									</Dropdown>
								</div>
							)}
						</div>
					</div>
					<div className="h-full w-full flex justify-center bg-slate-50 pt-6">
						<Outlet />
					</div>
					{isModalVisible && (
						<UploadModal
							openModal={isModalVisible}
							handleCloseModalUpload={handleCloseModal}
						/>
					)}
					{isModalEditVisible && (
						<EditClass
							openModal={isModalEditVisible}
							handleCloseModalEditClass={handleCloseEditModal} classId={""}						/>
					)}
				</section>
			</div>
		</div>
	);
};

export default ClassLayout;
