import { FC, useEffect, useState } from "react";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import { listGradeAllClassQuery } from "../../../api/store/class/queries";

interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

const columns: ColumnsType<DataType> = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "student ID",
		dataIndex: "studentID",
		key: "studentID",
	},
];

const data: DataType[] = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: ["loser"],
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sydney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
];

const Grade: FC = () => {
	const { id } = useParams();
	const { data: gradeData } = listGradeAllClassQuery(id as string);
	const [gradeColumn, setGradeColumn] = useState<any[]>([
		{ title: "Name", dataIndex: "name", key: "name" },
		{ title: "student ID", dataIndex: "studentID", key: "studentID" },
	]);
	console.log("gradeData");
	console.log(gradeData);
	useEffect(() => {
		if (gradeData) {
			gradeData?.gradeCompositionDtos.sort((a, b) => a.order - b.order);
			gradeData?.gradeCompositionDtos?.map((item) => {
				console.log("item");
				console.log(item);
				setGradeColumn((prev) => [
					...prev,
					{
						title: item.name,
						dataIndex: item.name,
						key: item.name,
					},
				]);
			});
			console.log(gradeColumn);
		}
	}, [gradeData]);

	return (
		<div className="w-11/12">
			<Table columns={gradeColumn} dataSource={data} />
		</div>
	);
};

export default Grade;
