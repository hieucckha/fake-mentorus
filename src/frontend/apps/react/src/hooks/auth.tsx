import { useNavigate } from 'react-router-dom';

import { UseQueryResult } from '@tanstack/react-query';

import useAuthQuery from '../api/store/auth/queries';
import localStorageService from '../services/localStorage.service';
import { UserProfileDto } from '../api/store/auth/interface';

/**
 * Auth hook.
 */

const useAuth = (): Omit<UseQueryResult<UserProfileDto>, 'error' | 'isError'> => {
   const queryData = useAuthQuery();
   if (queryData.isError && queryData.error) {
    const navigate = useNavigate();
      localStorageService.removeItem('auth');
     navigate('/sign-in');
   }
   return queryData;

};
export default useAuth;
