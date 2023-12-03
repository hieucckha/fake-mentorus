import { useMutation, useQueryClient } from "@tanstack/react-query";

import classService from "../../../services/class.service";

export const useCreateClassMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (classData) => classService.createClass(classData),
		retry: false,
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["class"] });
		},
	});
};
