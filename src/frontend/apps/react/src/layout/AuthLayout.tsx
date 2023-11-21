import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import LocalStorageService from '../services/localStorage.service';

/**
 * Unauthorize layout.
 */
const AuthLayout: FC = (): JSX.Element => {
    const token = LocalStorageService.getItem('auth');
    return token ? <Outlet /> : <Navigate to='/sign-in' />;
};
export default AuthLayout;
