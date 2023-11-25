import type { FC } from "react";

import NavBarLogin from "../partials/NavBarLogin";
import Sidebar from "../partials/Sidebar";
import Dashboard from "../layout/Dashboard";

/**
 * Home page.
 */
const Home: FC = () => {
	return (
		// <div className="flex flex-col h-screen">
		<>
			<NavBarLogin />
			<Sidebar />
			<Dashboard />

		</>
	);
};

export default Home;
