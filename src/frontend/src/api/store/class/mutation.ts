import { useMutation, useQueryClient } from '@tanstack/react-query';

import classService from '../../../services/class.service';
import type { ClassDto } from './interface';

export const useCreateClassMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (classData:ClassDto) => classService.createClass(classData),
        retry: false,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['class'] });
        },
    });
}