import { FC } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import LocalStorageService from '../services/localStorage.service';

/**
 * Unauthorize layout.
 */
const UnauthorizeLayout: FC = (): JSX.Element => {
    const token = LocalStorageService.getItem('auth');
    return !token ? <Outlet /> : <Navigate to='/home' />;
};
export default UnauthorizeLayout;
