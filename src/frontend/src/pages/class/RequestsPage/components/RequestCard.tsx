import moment from "moment";
import {
	RequestDto,
	RequestStatus,
} from "../../../../api/store/class/interface";
import { App, Button, Popconfirm, Popover, Space, Tooltip } from "antd";
import {
	CheckOutlined,
	CloseOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import ApproveRequestForm from "./ApproveRequestForm";
import { useParams } from "react-router-dom";
import { useRejectRequest } from "../../../../api/store/request/mutation";

interface RequestCardProps extends RequestDto {
	isTeacherView?: boolean;
}

function RequestCard({
	id,
	studentId,
	studentName,
	status,
	gradeId,
	gradeName,
	currentGrade,
	expectedGrade,
	reason,
	updatedAt,
	createdAt,
	isTeacherView = false,
}: RequestCardProps) {
	const { message } = App.useApp();
	const [openApprovePopover, setOpenApprovePopover] = useState(false);
	const { id: classId } = useParams();
	const { mutate: rejectReqMutate, isPending: isRejectPending } =
		useRejectRequest(classId);

	if (!classId) return null;

	const hide = () => {
		setOpenApprovePopover(false);
	};

	const handleOpenChange = (newOpen: boolean) => {
		setOpenApprovePopover(newOpen);
	};

	const handleRejectRequest = () =>
		new Promise((resolve, reject) => {
			rejectReqMutate(id, {
				onSuccess() {
					message.success("Rejected successfully");
					resolve(null);
				},
				onError() {
					message.error("Rejected failed");
					reject();
				},
			});
		});

	const getTextColorClass = (status: RequestStatus) => {
		switch (status) {
			case RequestStatus.Pending:
				return "text-blue-500";
			case RequestStatus.Approved:
				return "text-green-500";
			case RequestStatus.Rejected:
				return "text-red-500";
		}
	};

	return (
		<div
			id={id.toString()}
			className="flex flex-col justify-between cursor-pointer bg-slate-200 rounded hover:opacity-80 hover:shadow-lg p-3 gap-x-5"
		>
			<div className="grid grid-cols-4">
				{/* ACTIONS */}
				{isTeacherView && status === RequestStatus.Pending && (
					<div className="absolute right-10">
						<Space>
							<Tooltip title="Approve Request" placement="bottomRight">
								<Popover
									arrow
									content={
										<ApproveRequestForm
											reqId={id.toString()}
											classId={classId}
											gradeValue={currentGrade}
											onClose={hide}
										/>
									}
									title="Approve Request"
									trigger="click"
									open={openApprovePopover}
									onOpenChange={handleOpenChange}
									placement="topRight"
								>
									<Button
										className="bg-green-500 hover:!bg-green-600"
										type="primary"
										shape="circle"
										size="small"
										icon={<CheckOutlined />}
									/>
								</Popover>
							</Tooltip>
							<Tooltip title="Reject Request" placement="bottomRight">
								<Popconfirm
									title="Reject request"
									description="Are you sure to reject this request?"
									okText="Yes"
									cancelText="No"
									okType="danger"
									placement="bottomRight"
									onConfirm={handleRejectRequest}
									icon={<QuestionCircleOutlined style={{ color: "red" }} />}
								>
									<Button
										className="bg-red-500 hover:!bg-red-600"
										type="primary"
										shape="circle"
										size="small"
										icon={<CloseOutlined />}
									/>
								</Popconfirm>
							</Tooltip>
						</Space>
					</div>
				)}
				{/* ------------ */}
				<div>
					<strong>Student ID:</strong> {studentId}
				</div>
				{studentId && (
					<div>
						<strong>Student Name:</strong> {studentId}
					</div>
				)}
				<div>
					<strong>Grade Column: </strong> {gradeName}
				</div>
				<div className="flex gap-x-1">
					<strong>Status: </strong>
					<span className={getTextColorClass(status)}>
						<strong>{status}</strong>
					</span>
				</div>
			</div>
			<div className="grid grid-cols-4">
				<div className="col-span-2">
					<strong>Current Grade: </strong>
					{currentGrade}
				</div>
				<div className="col-span-2">
					<strong>Expected Grade: </strong>
					{expectedGrade}
				</div>
			</div>
			<div className="grid grid-cols-4">
				<div className="col-span-2">
					<strong>Reason: </strong>
					{reason}
				</div>
				<div className="col-span-2">
					<strong>Request Day: </strong>
					{moment(createdAt).format("DD/MM/YYYY")}
				</div>
			</div>
		</div>
	);
}

export default RequestCard;
