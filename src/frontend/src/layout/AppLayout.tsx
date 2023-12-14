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
		<div className="bg-white">
			<NavBarLogin />
			<div className="bg-white w-full h-screen flex">
				<div className="flex-none sm:w-64 h-full ...">
					<Sidebar />
				</div>
				<div className="grow h-full ...">
					<Outlet/>
				</div>
			</div>
			
		</div>
	);
};

export default AppLayout;
