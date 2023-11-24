/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Outlet, Navigate } from "react-router-dom";

import LocalStorageService from "../services/localStorage.service";
import type { FC } from "react";

/**
 * Unauthorize layout.
 */
const AuthLayout: FC = (): JSX.Element => {
	const token = LocalStorageService.getItem("auth");
	return token ? <Outlet /> : <Navigate to="/sign-in" />;
};
export default AuthLayout;
