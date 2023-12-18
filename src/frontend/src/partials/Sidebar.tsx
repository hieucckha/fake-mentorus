import React, { useState } from "react";
import {
	AppstoreOutlined,
	BookOutlined,
	ContainerOutlined,
	DesktopOutlined,
	HomeOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu, Skeleton } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import classQuery from "../api/store/class/queries";
import useAuth from "../hooks/auth";

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
	const [collapsed, setCollapsed] = useState(false);
	const { data: user } = useAuth();

	const { data, isLoading } = classQuery(user?.id ?? -1);
	const { pathname } = useLocation();
	console.log("pathname")
	const getSelectedKey = (pathname: string) : string[]=>{
		var splitPath = pathname.split('/');
		if(splitPath.length>1){
			console.log([splitPath[1],splitPath[2]].join('/'))
			return [[splitPath[1],splitPath[2]].join('/')]
		}
		return ['']
	}
	const getDefaultOpenKey = (pathname: string) : string[]=>{
		var splitPath = pathname.split('/');
		console.log("open menu")
		console.log(splitPath.includes('class') ? ['class'] : [])
		return splitPath.includes('class') ? ['class'] : [];
	}
	console.log(pathname.split('/'))
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
		
			getItem(<NavLink style={{ fontSize: fontSizeMenu}} to={"class"}>Class</NavLink>, "class", <BookOutlined style={{ fontSize: fontSizeIcon}} />, 
				data?.map((item)=>
					getItem(
						<NavLink to={`class/${item.id}/overview`}>{item.name}</NavLink>,
						`class/${item.id}`
					  )
				)
			),
		]
	}
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

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
				inlineCollapsed={collapsed}
				items={itemsMenu}
			/>
		</div>
	);
};

export default Sidebar;
