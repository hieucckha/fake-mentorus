import { useMutation, useQueryClient } from "@tanstack/react-query";

import classService from '../../../services/class.service';
import { gradeCompositions } from "./interface";
import { newGradeCompositions } from "../class/interface";

export const useUpdateOrderGradeComposit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (gradeCompositions:gradeCompositions[]) => classService.updateOrderGradeComposit(gradeCompositions),
        retry: false,
        onSuccess() {
            // queryClient.invalidateQueries({ queryKey: ['class'] });
        },
    });
}
export const useAddNewGradeComposit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (composition:newGradeCompositions) => classService.addNewGradeComposit(composition),
        retry: false,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['class'] });
        },
    });
}