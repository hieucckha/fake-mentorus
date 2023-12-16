import classService from '../../../services/class.service';
import type { ClassDetail, ClassQuery } from './interface';
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const classQuery = (user_id:number): UseQueryResult<ClassQuery[]> => {
	const queryData = useQuery({
		queryKey: ["classes"],
		queryFn: () => classService.getAllClass(user_id),
		enabled: !!user_id,
	});
	return queryData;
};
export const classDetailQuery = (id:string): UseQueryResult<ClassDetail> => {
	const queryData = useQuery({
		queryKey: ["class", id],
		queryFn: () => classService.getClassDetail(id),
		enabled: !!id,
	});
	return queryData;
}

export default classQuery;