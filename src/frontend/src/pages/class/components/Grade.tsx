import { FC, useEffect, useState } from "react";

import { FloatButton, Table } from "antd";
import { useParams } from "react-router-dom";
import { listGradeAllClassQuery, listGradeOneStudentQuery } from "../../../api/store/class/queries";
import { PlusOutlined } from "@ant-design/icons";
import useAuth from "../../../hooks/auth";

const Grade: FC = () => {
	const { id } = useParams();
	const [gradeColumn, setGradeColumn] = useState<any[]>([
		{ title: "Name", dataIndex: "name", key: "name" },
		{ title: "student ID", dataIndex: "studentID", key: "studentID" },
	]);
	
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

	return (
		<>
			<div className="w-11/12">
				<Table columns={gradeColumn} dataSource={student} />
			</div>
			{
				user?.role === "Teacher" ? (
					<FloatButton
						// onClick={handleOpenModalAddGrade}
						shape="square"
						type="primary"
						style={{ right: 24 }}
						icon={<PlusOutlined  />}
					/>)
				:(<FloatButton
						// onClick={handleOpenModalRequestGrade}
						shape="square"
						type="primary"
						style={{ right: 24 }}
						icon={<PlusOutlined  />}
					/>)

			}

		</>
	);
};

export default Grade;
