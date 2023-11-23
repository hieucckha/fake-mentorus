import { UseQueryResult, useQuery } from '@tanstack/react-query';

import UserService from '../../../services/user.service';

import { UserProfileDto } from './interface';

const useAuthQuery = (): UseQueryResult<UserProfileDto> => {
  const queryData = useQuery(
    {
        queryKey: ['auth'],
        queryFn: UserService.getProfile,
    },
  );

  return queryData;
};

export default useAuthQuery;
