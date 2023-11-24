import type { FC } from "react";

import NavBarLogin from "../partials/NavBarLogin";
import Sidebar from "../partials/Sidebar";

/**
 * Home page.
 */
const Home: FC = () => {
	return (
		// <div className="flex flex-col h-screen">
		<>
			<NavBarLogin />
			<Sidebar />
		</>
	);
};

export default Home;
