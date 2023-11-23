import { useMutation, useQueryClient } from '@tanstack/react-query';

import userService from '../../../services/user.service';

import localStorageService from '../../../services/localStorage.service';
import AuthServices from '../../../services/auth.service';

import { SigninData, UserProfileDto } from './interface';

/**
 * @file API - Store - `auth` - Mutations.
 */

// eslint-disable-next-line jsdoc/require-jsdoc
export const useSignInMutation = () =>
useMutation({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    mutationFn: (SigninData: SigninData) => AuthServices.login(SigninData.email, SigninData.password),
    retry: false,
    onSuccess(data) {
      localStorageService.setItem('auth', data.token);
    },
});

export const userUpdateProfileMutation = (user: UserProfileDto) => {
  const queryClient = useQueryClient();
useMutation({
    mutationFn: () => userService.updateProfile(user),
    retry: false,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
});
};
