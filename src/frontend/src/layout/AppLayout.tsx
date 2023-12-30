import { useEffect, type FC } from "react";

import NavBarLogin from "../partials/NavBarLogin";
import Sidebar from "../partials/Sidebar";
import { Outlet } from "react-router-dom";
import connection from "../utils/Notification";

/**
 * Home page.
 */

const AppLayout: FC = () => {
		console.log("connection started", connection);

	useEffect(() => {
		if (connection.state === "Disconnected") {
			connection.start();
		}
		
		return () => {
			console.log("connection stopped", connection.state);
			if( connection.state === "Connected") {
				connection.stop();
			}
		};
	}, []);
	return (
		// <div className="flex flex-col h-screen">
		<div className="bg-white">
			<NavBarLogin />
			<div className="bg-white w-full h-screen flex">
				<div className="flex-none sm:w-64 h-full ...">
					<Sidebar />
				</div>
				<div className="grow h-full ...">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
