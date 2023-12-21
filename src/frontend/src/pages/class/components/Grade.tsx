import { FC, useEffect, useState } from "react";

import { FloatButton, Table } from "antd";
import { useParams } from "react-router-dom";
import { listGradeAllClassQuery, listGradeOneStudentQuery } from "../../../api/store/class/queries";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import useAuth from "../../../hooks/auth";
import AddGrade from "../../../modal/AddGrade";
import CreateRequest from "../../../modal/CreateRequest";

const Grade: FC = () => {
	const { id } = useParams();
	const [gradeColumn, setGradeColumn] = useState<any[]>([
		{ title: "Name", dataIndex: "name", key: "name" },
		{ title: "student ID", dataIndex: "studentID", key: "studentID" },
	]);
	const [isOpenModalAddGrade, setIsOpenModalAddGrade] = useState(false);
	const [isOpenModalRequestGrade, setIsOpenModalRequestGrade] = useState(false);
	const {data: user} = useAuth();

	const { data: gradeData } = user?.role==="Teacher" ? listGradeAllClassQuery(id as string) : listGradeOneStudentQuery(id as string, user?.studentId ?? "" );
	const [student, setStudent] = useState<any[]>([]);
	useEffect(() => {
		if (gradeData) {
			console.log(gradeData);
			setStudent([]);
			setGradeColumn([
				{ title: "Name", dataIndex: "name", key: "name" },
				{ title: "student ID", dataIndex: "studentID", key: "studentID" },
			]);
			gradeData?.gradeCompositionDtos?.sort((a, b) => a.order - b.order);
			gradeData?.gradeCompositionDtos?.map((item) => {
				setGradeColumn((prev) => [
					...prev,
					{
						title:
							item.gradeScale &&
							`${item.name} (${item.gradeScale.toString()}%)`,
						dataIndex: item.id,
						key: item.id,
					},
				]);
			});
			gradeData?.students?.map((item) => {
				let temp = {
					name: item.studentName,
					studentID: item.studentId,
				};
				item?.gradeDto?.map((grade) => {
					temp = {
						...temp,
						[grade.gradeCompositionId]: grade.gradeValue,
					};
				});
				setStudent((prev) => [...prev, temp]);
			});
		}
	}, [gradeData]);
	const handleOpenModalAddGrade = () => {
		setIsOpenModalAddGrade(true);
	};
	return (
		<>
			<div className="w-11/12">
				<Table columns={gradeColumn} dataSource={student} />
			</div>
			{
				user?.role === "Teacher" ? (
					<FloatButton
						onClick={handleOpenModalAddGrade}
						type="primary"
						style={{ right: 24 }}
						icon={<EditOutlined />}
					/>)
				:(<FloatButton
						onClick={()=>setIsOpenModalRequestGrade(true)}
						type="primary"
						style={{ right: 24 }}
						icon={<PlusOutlined  />}
					/>)

			}
			{
				isOpenModalAddGrade && (<AddGrade openModal={isOpenModalAddGrade} handleCloseModalAddGrade={() => setIsOpenModalAddGrade(false)} />)
			}
			{
				isOpenModalRequestGrade && (<CreateRequest open={isOpenModalRequestGrade} handleClose={() => setIsOpenModalRequestGrade(false)} />)
			}

		</>
	);
};

export default Grade;
