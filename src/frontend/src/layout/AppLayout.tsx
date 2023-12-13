import type { FC } from "react";

import NavBarLogin from "../partials/NavBarLogin";
import Sidebar from "../partials/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

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
			<div className="w-full h-full flex">
				<div className="flex-none w-64 h-full ...">
					<Sidebar />
				</div>
				<div className="grow h-full ...">
					<Outlet/>
				</div>
			</div>
			
		</>
	);
};

export default AppLayout;
