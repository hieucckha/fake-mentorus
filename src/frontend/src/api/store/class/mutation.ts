import { useMutation, useQueryClient } from "@tanstack/react-query";

import classService from '../../../services/class.service';
import type { ClassDto } from './interface';
import { useParams } from "react-router-dom";

export const useCreateClassMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (classData:ClassDto) => classService.createClass(classData),
        retry: false,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
        },
    });
}
export const useJoinClassMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (classData:{code:string}) => classService.joinClassByCode(classData),
        retry: false,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
        },
    });
}
export const useInviteClassMutationByEmail = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (classData:{email:string,courseId:string}) => classService.inviteClassByEmail(classData),
        retry: false,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
        },
    });
}

export const useEditGradeMutation = () => {
    const queryClient = useQueryClient();
    const { id: classId} = useParams();
    if (!classId) throw new Error("No class id");

    return useMutation({
        mutationKey: ["edit-grade-student"],
        mutationFn: classService.editGradeStudent,
        onSuccess() {
            return queryClient.refetchQueries({ queryKey: ['classes', classId], exact: true });
        }
    });
}

