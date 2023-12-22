import classService from '../../../services/class.service';
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ClassListQuery } from './interface';


export const  classQueryWithoutParams = (): UseQueryResult<ClassListQuery[]> => {
	const queryData = useQuery({
		queryKey: ["admin-classes"],
		queryFn: () => classService.getAllClassWithoutParams(),
	});
	return queryData;
};