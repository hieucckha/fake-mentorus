import { useQueryClient } from "@tanstack/react-query";
import { MenuProps, Flex, Space, Avatar } from "antd";
import { Dropdown } from "flowbite";
import { useState, type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileDto } from "../api/store/auth/interface";
import ClassMember from "./components/ClassMember";
import useClassDetail from "../hooks/useClassDetail";

interface MemberCardProps extends Partial<UserProfileDto> {}
const ClassroomMember: FC<MemberCardProps> = ({}) => {
    const {data: classDetail } = useClassDetail();
    
	const data: UserProfileDto[] = [
		{
			fullName: "string",
			id: 1,
			email: "string@emai.lcom",
			studentId: "123",
			role: "student",
		},
		{
			fullName: "string2",
			id: 2,
			email: "string@emai.lcom",
			studentId: "123",
			role: "student",
		},
		{
			fullName: "string3",
			id: 3,
			email: "string@emai.lcom",
			studentId: "123",
			role: "student",
		},
	];

	return (
		<div className="w-3/5 flex flex-col items-center justify-start">
			<div className="w-full">
				<div className=" pl-4 py-2 flex flex-row text-[rgb(25,103,210)] border-b border-b-[rgb(25,103,210)]">
					<div className="grow text-3xl align-middle">Teachers</div>
					{/* {userRole === USER_ROLE.Teacher && <InviteMember isInviteTeacher />} */}
				</div>

				{data.map((item) => (
					<ClassMember
						className={"text-base px-4 w-full h-[52px] md:h-[64px]"}
						{...item}
					/>
				))}
			</div>
            <div className="w-full">
				<div className=" pl-4 py-2 flex flex-row text-[rgb(25,103,210)] border-b border-b-[rgb(25,103,210)]">
					<div className="grow text-3xl align-middle">Students</div>
					{/* {userRole === USER_ROLE.Teacher && <InviteMember isInviteTeacher />} */}
				</div>


				{data.map((item) => (
					<ClassMember
						className={"text-base px-4 w-full h-[52px] md:h-[12dvh]"}
						{...item}
					/>
				))}
            </div>
		</div>
	);
};
export default ClassroomMember;
