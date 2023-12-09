import classService from '../../../services/class.service';
import type { ClassQuery } from './interface';
import { UseQueryResult, useQuery } from "@tanstack/react-query";

const classQuery = (id:number): UseQueryResult<ClassQuery[]> => {
	const queryData = useQuery({
		queryKey: ["class"],
		queryFn: () => classService.getAllClass(id),
	});
	return queryData;
};
export default classQuery;