import React from "react";
import {
	BookOutlined,
	ControlOutlined,
	HomeOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {  Menu, Skeleton } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import classQuery from "../api/store/class/queries";
import useAuth from "../hooks/auth";
import { UserRole } from "../api/store/auth/interface";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const fontSizeIcon = "20px";
const fontSizeMenu = "16px";

const Sidebar: React.FC = () => {
	// const [collapsed, setCollapsed] = useState(false);
	const { data: user } = useAuth();

	const { data, isLoading } = classQuery(user?.id ?? -1);
	const { pathname } = useLocation();
	const getSelectedKey = (pathname: string) : string[]=>{
		var splitPath = pathname.split('/');
		if(splitPath.length>1){
			return [[splitPath[1],splitPath[2]].join('/')]
		}
		return ['']
	}
	const getDefaultOpenKey = (pathname: string) : string[]=>{
		var splitPath = pathname.split('/');
		return splitPath.includes('class') ? ['classes'] : [];
	}
	var itemsMenu : MenuProps['items'] = []
	if(isLoading){
		itemsMenu = [
			getItem(<NavLink style={{ fontSize: fontSizeMenu}} to={"home"}>Home</NavLink>, "home", <HomeOutlined style={{ fontSize: fontSizeIcon}}/>),
		
			getItem(
				<div className="flex flex-row items-center gap-x-2">
					<Skeleton.Input className="w-14 h-6" active={true} size={"small"} />
				</div>,'skeleton',<Skeleton.Avatar className="w-14 h-8" active={true} size={"default"} shape={"circle"} />),
		]
	}else if(data){
		itemsMenu = [
			getItem(<NavLink style={{ fontSize: fontSizeMenu}} to={"home"}>Home</NavLink>, "home", <HomeOutlined style={{ fontSize: fontSizeIcon}}/>),
		
			getItem('Class', "classes", <BookOutlined style={{ fontSize: fontSizeIcon}} />, 
				data?.map((item)=>
					getItem(
						<NavLink to={`class/${item.id}/overview`}>{item.name}</NavLink>,
						`class/${item.id}`
					  )
				)
			),
		]
	}
	if(user?.role === UserRole.Admin){
		itemsMenu = [];
		itemsMenu.push(getItem(<NavLink style={{ fontSize: fontSizeMenu}} to={"/admin/classes"}>Management class</NavLink>, "Management class", <ControlOutlined style={{ fontSize: fontSizeIcon}}/>))
		itemsMenu.push(getItem(<NavLink style={{ fontSize: fontSizeMenu}} to={"/admin/users"}>Management user</NavLink>, "Management user", <UsergroupAddOutlined style={{ fontSize: fontSizeIcon}}/>))

	}
	

	return (
		<div
			className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
			style={{ width: 256 }}
		>
			<Menu
				className="mt-0"
				defaultSelectedKeys={getSelectedKey(pathname)}
				selectedKeys={getSelectedKey(pathname)}
				defaultOpenKeys={getDefaultOpenKey(pathname)}
				mode="inline"
				theme="light"
				inlineCollapsed={false}
				items={itemsMenu}
			/>
		</div>
	);
};

export default Sidebar;
