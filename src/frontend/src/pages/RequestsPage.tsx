import React, { useEffect, useState } from "react";
import useClassDetail from "../hooks/useClassDetail";
import { RequestStatus, requests } from "../api/store/class/interface";

export default function RequestsPage() {
	const { data, isLoading } = useClassDetail();
	const [request, setRequest] = useState<
        requests[]
	>([]);
	
	const getTextColorClass = (status : RequestStatus)=>{
		switch(status){
			case RequestStatus.Pending:
				return 'text-amber-400'
			case RequestStatus.Approved:
				return 'text-green-500'
			case RequestStatus.Rejected:
				return 'text-red-400'
		}
	}

    useEffect(() => {
		if (data) {
			setRequest(addKeyWithId(data.requests));
		}
	}, [data]);
	return <div className="w-full">
		<div className="flex flex-col w-full gap-y-5 p-5">
		{
			request && request.map(item=>{
				return <div className="flex cursor-pointer flex-col bg-slate-200 rounded hover:bg-slate-100 p-3 gap-x-5 justify-between">
					<div className="flex flex-row justify-between gap-x-6">
						<div className="flex flex-row justify-start gap-x-1">
							<strong>{item.studentName}</strong>
						</div>
						<div className="flex flex-row justify-start gap-x-1">
							<strong>Status</strong>
							<div className={getTextColorClass(item.status)}>
								<strong>{item.status}</strong>
							</div>
						</div>
					</div>
					<div className="flex flex-row justify-between gap-x-6">
						<div className="flex flex-row justify-start gap-x-1">
							<strong>Grade Composition: </strong>
							<div className="">
								{item.gradeId}
							</div>
						</div>
						<div className="flex flex-row justify-start gap-x-1">
							<strong>Current Grade: </strong>
							{item.currentGrade}
						</div>
						<div className="flex flex-row justify-start gap-x-1">
							<strong>Expected Grade: </strong>
							{item.expectedGrade}
						</div>
					</div>
					<div className="flex flex-row justify-between gap-x-6">
						<div className="flex flex-row justify-start gap-x-1 max-w-6xl">
							<strong>Reason: </strong>
							{item.reason}
						</div>
						<div className="flex flex-row justify-start gap-x-1">
							<strong>Request Day: </strong>
							{item.updatedAt}
						</div>
					</div>
				</div>
			})
		}
		</div>
    </div>;
}
const addKeyWithId = (array: any) => {
	let arrClone = array?.map((item: any) => ({ ...item, key: item.id }));
	return arrClone;
};