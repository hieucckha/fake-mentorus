import type { FC } from "react";

import NavBarLogin from "../partials/NavBarLogin";
import Sidebar from "../partials/Sidebar";
import { Outlet } from "react-router-dom";

/**
 * Admin page.
 */
const AdminLayout: FC = () => {
	return (
		<div className="bg-white">
			<NavBarLogin />
			<div className="bg-white w-full h-screen flex">
				<div className="flex-none sm:w-64 h-full ...">
					<Sidebar  />
				</div>
				<div className="grow h-full ...">
					<Outlet/>
				</div>
			</div>
			
		</div>
	);
};

export default AdminLayout;
