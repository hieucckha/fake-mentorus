import { MenuProps, Flex, Space, Avatar } from "antd";
import { UserProfileDto } from "../../api/store/auth/interface";
import { FC } from "react";

interface MemberCardProps extends Partial<UserProfileDto> {
  isOwner?: boolean;
  isStudent?: boolean;
  isTeacher?: boolean;
  className?: string;
}
const ClassMember: FC<MemberCardProps> = ({
  id,
  email,
  isOwner = false,
  className = 'text-base px-4 h-[52px] md:h-[64px]',
  isStudent = false,
  isTeacher = false,
}) => {
    const menuItemsBuilder = (): MenuProps['items'] => {
    return []
    // // If i am owner, i can kick student and remove teacher
    // if (isClassOwner) {
    //   if (isStudent) {
    //     return [
    //       {
    //         label: 'Remove Student',
    //         key: 'remove-student',
    //         danger: true,
    //       },
    //     ];
    //   }
    //   return [
    //     {
    //       label: 'Remove Teacher',
    //       key: 'remove-teacher',
    //       danger: true,
    //     },
    //   ];
    // }

    // // If i am teacher, i can kick student and leave class
    // if (isClassTeacher) {
    //   if (isStudent) {
    //     return [
    //       {
    //         label: 'Remove Student',
    //         key: 'remove-student',
    //         danger: true,
    //       },
    //     ];
    //   }
    //   return [
    //     {
    //       label: 'Leave Class',
    //       key: 'leave-class',
    //       danger: true,
    //     },
    //   ];
    // }

    // // If i am student, i can leave class
    // return [
    //   {
    //     label: 'Leave Class',
    //     key: 'leave-class',
    //     danger: true,
    //   },
    // ];
  };

  const dropDownRender = () => {
    // if (isOwner) {
    //   return;
    // }

    // // If render teacher card and i am not owner
    // if (isTeacher && !isClassOwner) {
    //   // And i am not a teacher in class
    //   if (!isClassTeacher) {
    //     // Not show dropdown
    //     return;
    //   }

    //   // Then am a teacher in class and i am currently rendering another teacher card
    //   if (!isMySelf) {
    //     // Not show dropdown
    //     return;
    //   }
    // }

    // // If i am a student in class
    // const isClassStudent = !isClassTeacher && !isClassOwner;

    // // If render student card
    // // And i am student in class and i am currently rendering another student card
    // if (isStudent && isClassStudent && !isMySelf) {
    //   // Not show dropdown
    //   return;
    // }

    // // Show dropdown
    // return (
    //   <Dropdown
    //     menu={{ items: menuItemsBuilder(), onClick: onItemClick }}
    //     arrow
    //     trigger={['click']}
    //     placement="bottomRight"
    //   >
    //     <button className="twp hover:bg-blue-50 rounded-full w-[32px] h-[32px] flex justify-center items-center">
    //       <MoreOutlined className="text-inherit text-[22px]" />
    //     </button>
    //   </Dropdown>
    // );
  };

  return (
    <Flex className={className} align="center" justify="start" gap={'middle'}>
      <Flex flex={1} justify="start">
        <Space align="center" size="middle">
          <Avatar className="hidden sm:block object-cover scale-150" shape="circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ39lLZZSixexryn9Y9tVucQY52-nOlNJfqNperhD4pZUZGAGLnBi5rhWiHFXJCUgfeKnQ&usqp=CAU"/> 
          <span className="text-black text-xl !font-bold leading-5">{email} </span>
        </Space>
      </Flex>
      {/* {dropDownRender()} */}
    </Flex>
  );
}

export default ClassMember;