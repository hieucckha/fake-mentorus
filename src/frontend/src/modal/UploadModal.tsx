import { useState, type FC } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { App, Table } from "antd";
import { AxiosError } from "axios";
import readXlsxFile from "read-excel-file";
interface UploadProps {
	handleCloseModalUpload: () => void;
	openModal: boolean;
}

const Upload: FC<UploadProps> = ({
	handleCloseModalUpload,
	openModal,
}): JSX.Element => {
	const [isPreview, setIsPreview] = useState(false);
	const [file, setFile] = useState<File>(new File([""], "filename"));
	const [gradeColumn, setGradeColumn] = useState<any[]>([]);
	const [student, setStudent] = useState<any[]>([]);
	const selectedFile = (e: any) => {
		setFile(e.target.files[0]);
	};
	const handlePreview = () => {
		setIsPreview(true);
		readXlsxFile(file).then((rows) => {
			rows.map((item, index) => {
				console.log(item);
				console.log(index);
				if (index == 0) {
					item.map((grade, index) => {
						setGradeColumn((prev) => [
							...prev,
							{
								title: grade,
								dataIndex: index,
								key: index,
							},
						]);
					});
					console.log("gradeColumn");
				} else {
					let temp = {
						0: item[0],
						1: item[1],
					};
					item.map((grade, index) => {
						if (index > 1) {
							console.log(grade);
							temp = {
								...temp,
								[index]: grade,
							};
						}
					});
					setStudent((prev) => [...prev, temp]);
				}
			});
		});
	};
	const handleClick = () => {
		console.log(student);
		console.log(gradeColumn);
	};

	return (
		<>
			<Modal show={openModal} size="7xl" popup onClose={handleCloseModalUpload}>
				<Modal.Header />
				<Modal.Body>
					{!isPreview ? (
						<div className="flex items-center justify-center w-full">
							<label
								htmlFor="dropzone-file"
								className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
							>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<svg
										className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 16"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
										/>
									</svg>
									<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
										<span className="font-semibold">Click to upload</span> or
										drag and drop
									</p>
									{file?.size == 0 ? (
										<p className="text-xs text-gray-500 dark:text-gray-400">
											SVG, PNG, JPG or GIF (MAX. 800x400px)
										</p>
									) : (
										<p className="text-xs text-gray-500 dark:text-gray-400">
											{file?.name}
										</p>
									)}
									
								</div>
								<input
									id="dropzone-file"
									type="file"
									className="hidden"
									onChange={selectedFile}
								/>
							</label>
						</div>
					) : (
						<Table columns={gradeColumn} dataSource={student} />
					)}

					{file?.size != 0 && (
						<div className="flex flex-row justify-center">
							{!isPreview && (
								<Button
									onClick={handlePreview}
									className="items-center  m-4 justify-center"
								>
									Preview
								</Button>
							)}

							<Button
								onClick={handleClick}
								className="items-center  m-4 justify-center"
							>
								Upload
							</Button>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Upload;
