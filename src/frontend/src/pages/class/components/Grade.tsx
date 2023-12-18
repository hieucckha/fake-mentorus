import { FC, useEffect, useState } from "react";

import { Table } from "antd";
import { useParams } from "react-router-dom";
import { listGradeAllClassQuery } from "../../../api/store/class/queries";

const Grade: FC = () => {
	const { id } = useParams();
	const { data: gradeData } = listGradeAllClassQuery(id as string);
	const [gradeColumn, setGradeColumn] = useState<any[]>([
		{ title: "Name", dataIndex: "name", key: "name" },
		{ title: "student ID", dataIndex: "studentID", key: "studentID" },
	]);
	const [student, setStudent] = useState<any[]>([]);
	useEffect(() => {
		if (gradeData) {
			gradeData?.gradeCompositionDtos?.sort((a, b) => a.order - b.order);
			gradeData?.gradeCompositionDtos?.map((item) => {
				setGradeColumn((prev) => [
					...prev,
					{
						title: item.gradeScale && `${item.name} (${item.gradeScale.toString()}%)`, 
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
				}
				);
				setStudent((prev) => [...prev, temp]);
			}
			);
		}
		
	}, [gradeData]);
	
	return (
		<div className="w-11/12">
			
			<Table columns={gradeColumn} dataSource={student} />
		</div>
	);
};

export default Grade;
