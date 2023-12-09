import type { FC } from "react";

import NavBarLogin from "../partials/NavBarLogin";
import Sidebar from "../partials/Sidebar";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";
import ClassLayout from "./ClassLayout";

/**
 * Home page.
 */
const AppLayout: FC = () => {
	const location =useLocation();
	console.log(location.pathname);
	return (
		// <div className="flex flex-col h-screen">
		<>
			<NavBarLogin />
			<Sidebar />
			{ 
				location.pathname == "/home" ? (<Dashboard />):(<ClassLayout />)
			}
			
		</>
	);
};

export default AppLayout;
