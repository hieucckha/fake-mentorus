import classService from '../../../services/class.service';
import type { ClassDetail, ClassQuery } from './interface';
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const classQuery = (id:number): UseQueryResult<ClassQuery[]> => {
	const queryData = useQuery({
		queryKey: ["class"],
		queryFn: () => classService.getAllClass(id),
		enabled: !!id,
	});
	return queryData;
};
export const classDetailQuery = (id:string): UseQueryResult<ClassDetail> => {
	const queryData = useQuery({
		queryKey: ["class"],
		queryFn: () => classService.getClassDetail(id),
	});
	return queryData;
}
export default classQuery;