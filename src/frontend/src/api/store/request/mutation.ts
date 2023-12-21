import { useMutation, useQueryClient } from "@tanstack/react-query"
import { RequestService } from "../../../services/request.service"

export const useCreateGradeRequest = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: RequestService.createRequest,
    })
}

