import React, { useState } from "react";
import {
	Form,
	Input,
	InputNumber,
	Popconfirm,
	Table,
	Typography,
	Button,
} from "antd";
import type { DragEndEvent } from "@dnd-kit/core";
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ColumnsType } from "antd/es/table";
interface Item {
	key: string;
	name: string;
	age: number;
	address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 12; i++) {
	originData.push({
		key: i.toString(),
		name: `Edward ${i}`,
		age: 32,
		address: `London Park no. ${i}`,
	});
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: "number" | "text";
	record: Item;
	index: number;
	children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{ margin: 0 }}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	"data-row-key": string;
}
const RowDragable = (props: RowProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: props["data-row-key"],
	});

	const style: React.CSSProperties = {
		...props.style,
		transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
		transition,
		cursor: "move",
		...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
	};

	return (
		<tr
			{...props}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		/>
	);
};
const GradeStructure: React.FC = () => {
	const [form] = Form.useForm();
	const [data, setData] = useState(originData);
	const [editingKey, setEditingKey] = useState("");

	const isEditing = (record: Item) => record.key === editingKey;
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				// https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
				distance: 1,
			},
		})
	);
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			setData((prev) => {
				const activeIndex = prev.findIndex((i) => i.key === active.id);
				const overIndex = prev.findIndex((i) => i.key === over?.id);
				return arrayMove(prev, activeIndex, overIndex);
			});
		}
	};
	const edit = (record: Partial<Item> & { key: React.Key }) => {
		form.setFieldsValue({ name: "", age: "", address: "", ...record });
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey("");
	};
	const handleAdd = () => {
		const newData: Item = {
			key: data.length.toString(),
			name: `Edward ${data.length}`,
			age: 32,
			address: `London Park no. ${data.length}`,
		};
		setData([...data, newData]);
	};
	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item;
			console.log(row);
			const newData = [...data];
			console.log(newData);

			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setData(newData);
				setEditingKey("");
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey("");
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns = [
		{
			title: "name",
			dataIndex: "name",
			width: "25%",
			editable: true,
		},
		{
			title: "age",
			dataIndex: "age",
			width: "15%",
			editable: true,
		},
		{
			title: "address",
			dataIndex: "address",
			width: "40%",
			editable: true,
		},
		{
			title: "operation",
			dataIndex: "operation",
			render: (_: any, record: Item) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
							style={{ marginRight: 8 }}
						>
							Save
						</Typography.Link>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingKey !== ""}
						onClick={() => edit(record)}
					>
						Edit
					</Typography.Link>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: Item) => {
				console.log("onCell");
				return {
					record,
					inputType: col.dataIndex === "age" ? "number" : "text",
					dataIndex: col.dataIndex,
					title: col.title,
					editing: isEditing(record),
				};
			},
		};
	});

	return (
		<div className="w-full">
			<div className="row grid justify-items-end pl-5 pr-5">
				<Button
					onClick={handleAdd}
					ghost
					type="primary"
					style={{ marginBottom: 16 }}
				>
					Add a row
				</Button>
			</div>
			<DndContext
				sensors={sensors}
				modifiers={[restrictToVerticalAxis]}
				onDragEnd={onDragEnd}
			>
				<SortableContext
					// rowKey array
					items={data.map((i) => i.key)}
					strategy={verticalListSortingStrategy}
				>
					<Form form={form} component={false}>
						<Table
							components={{
								body: {
									cell: EditableCell,
									row: RowDragable,
								},
							}}
							bordered
							dataSource={data}
							columns={mergedColumns}
							rowClassName="editable-row"
							pagination={false}
						/>
					</Form>
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default GradeStructure;
