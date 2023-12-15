import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { classDetailQuery } from "../api/store/class/queries";
import { gradeCompositions, newGradeCompositions } from "../api/store/class/interface";
// interface Item extends gradeCompositions{
// 	id: number;
// 	name: string;
// 	courseId: number;
// 	description: string;
// 	gradeScale: number;
// 	order: number;
// 	createdAt: string;
// 	updatedAt: string;
// 	// key: string;
// 	// name: string;
// 	// age: number;
// 	// address: string;
// }

const originData: gradeCompositions[] = [];
const fullPercent = 100;
for (let i = 1; i < 5; i++) {
	originData.push({
		id: i,
		key: i,
		name: `Edward ${i}`,
		gradeScale: Math.ceil(100 - Math.random() * 30),
		description: `London Park no. ${i}`,
		courseId: 0,
		order: 0,
		createdAt: "stringnumber",
		updatedAt: "stringnumber",
	});
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	inputType: "number" | "text";
	record: gradeCompositions;
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
import { App } from "antd";
import useClassDetail from "../hooks/useClassDetail";
import { useAddNewGradeComposit, useUpdateGradeColumn, useUpdateOrderGradeComposit } from "../api/store/gradeComposits/mutation";
import { useJoinClassMutation } from "../api/store/class/mutation";
import Swal from "sweetalert2";
const addKeyWithId= (array:any)=>{
	let arrClone = array.map((item:any)=>({...item,key:item.id}))
	return arrClone;
}
const GradeStructure: React.FC = () => {
	const {id} = useParams()
	if(!id) return null;
	const { message,  } = App.useApp();
    const {data, isLoading } = useClassDetail();
	const mutation = useUpdateOrderGradeComposit();
	const mutationAddGradeColumn = useAddNewGradeComposit();
	const mutationUpdateGradeColumn = useUpdateGradeColumn();
	// const {data, isLoading,error,isError} = classDetailQuery(id as string );
	// if (isLoading) return <>Loading</>;
	// if (isError) return <>{error}</>;

	const [form] = Form.useForm();
	const [gradeCompositions, setGradeCompositions] = useState<gradeCompositions[]>([]);
	const [editingKey, setEditingKey] = useState(0);

	const isEditing = (record: gradeCompositions) => record.id == editingKey;
	function isGradeScaleSumValid(gradeScaleArray: gradeCompositions[]) {
		const sum = gradeScaleArray.reduce((total, item) => total + (item.gradeScale || 0), 0);
		return sum <= 100;
	  }
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				// https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
				distance: 1,
			},
		})
	);
	const reOrderArray = ()=>{
		if (!Array.isArray(gradeCompositions) ) return;
		const array = gradeCompositions.map((item,idx)=>{
			return {
				...item,
				order: idx+1
			}
		})
		console.log("Call api reindex")
		console.log(array)
		mutation.mutate(array,
		{
			onSuccess() { 
			},
			onError(error) {
				console.log(error);
			},
		});
		// setGradeCompositions(array)
	}
	useEffect(()=>{
		console.log("gradeCompositions")
		console.log(gradeCompositions)
		if(gradeCompositions){
			reOrderArray()
		}
	},[gradeCompositions])
	useEffect(() => {
		if (data) {
			setGradeCompositions(addKeyWithId(data.gradeCompositions))
		}
	}, [data])

	if(isLoading) return <div>Loading...</div>;
	
	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			setGradeCompositions((prev: gradeCompositions[]) => {
				const activeIndex = prev.findIndex((i) => i.id === active.id);
				const overIndex = prev.findIndex((i) => i.id === over?.id);
				return arrayMove(prev, activeIndex, overIndex);
			});
			// save order
		}
	};
	const edit = (record: Partial<gradeCompositions>) => {
		form.setFieldsValue({ name: "", gradeScale: 0, ...record });
		if (record.id) {
			setEditingKey(record.id);
		}
	};

	const cancel = () => {
		setEditingKey(0);
	};
	const handleAdd = () => {
		const newData: newGradeCompositions = {
			name: `New gradeCompositions`,
			description: `New gradeCompositions`,
			gradeScale: 0,
			courseId: +id,
		};
		mutationAddGradeColumn.mutate(newData,
			{
				onSuccess() { 
				},
				onError(error:any) {
					console.log(error);
				},
			})
		
		
	};
	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as gradeCompositions;
			const newData = [...gradeCompositions];
			const index = newData.findIndex((item) => key === item.id);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				console.log("Save")
				console.log(newData)
				if(!isGradeScaleSumValid(newData)){
					Swal.fire({
						title: "Error",
						text: "Total Grade Scale > 100%",
						icon: "error",
						timer: 2000,
						showCancelButton: false,
						showConfirmButton: false,
					})
					return
				}
				mutationUpdateGradeColumn.mutate({
					...item,
					...row,
				},{
					onSuccess() { 
						Swal.fire({
							title: "Success",
							text: "Save Grade Composition successfully",
							icon: "success",
							timer: 1000,
							showCancelButton: false,
							showConfirmButton: false,
						})
					},
					onError(error:any) {
						Swal.fire({
							title: "Error",
							text: "Some error happening",
							icon: "error",
							timer: 1000,
							showCancelButton: false,
							showConfirmButton: false,
						})
						console.log(error);
					},
				}
				)
				
				setGradeCompositions(newData);
				setEditingKey(0);
			} else {
				newData.push(row);
				setGradeCompositions(newData);
				setEditingKey(0);
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			width: "40%",
			editable: true,
		},
		{
			title: "GradeScale",
			dataIndex: "gradeScale",
			width: "40%",
			editable: true,
		},
		{
			title: "Operation",
			dataIndex: "operation",
			render: (_: any, record: gradeCompositions) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.id)}
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
						disabled={editingKey !== 0}
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
			onCell: (record: gradeCompositions) => {
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
					items={gradeCompositions.map((i) => i.id)}
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
							dataSource={gradeCompositions}
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
