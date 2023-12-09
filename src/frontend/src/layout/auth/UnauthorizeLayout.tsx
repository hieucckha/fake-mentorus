import type { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";

import LocalStorageService from "../../services/localStorage.service";

/**
 * Unauthorize layout.
 */
const UnauthorizeLayout: FC = (): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const token = LocalStorageService.getItem("auth");
	return token ? <Navigate to="/home" /> : <Outlet />;
};
export default UnauthorizeLayout;
