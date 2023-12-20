import { useLocation, useNavigate } from "react-router-dom";

import type { UseQueryResult } from "@tanstack/react-query";

import useAuthQuery from "../api/store/auth/queries";
import localStorageService from "../services/localStorage.service";
import type { UserProfileDto } from "../api/store/auth/interface";

/**
 * Auth hook.
 */
const useAuth = (): Omit<
	UseQueryResult<UserProfileDto>,
	"error" | "isError"
> => {
	const location = useLocation();
	const queryData = useAuthQuery();

	if (queryData.isError && queryData.error) {
		const navigate = useNavigate();
		localStorageService.removeItem("auth");
		navigate("/sign-in", {
			replace: true,
			state: {
				from: location,
			},
		});
	}
	return queryData;
};
export default useAuth;
