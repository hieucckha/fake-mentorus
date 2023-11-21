import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import LocalStorageService from '../services/localStorage.service';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
// eslint-disable-next-line jsdoc/require-jsdoc
export const setupInterceptors = (store: unknown) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async err => {
      const originalConfig = err.config;
      if (originalConfig.url !== '/auth/login' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const localToken = sessionStorage.getItem('token');

            const data = { token: localToken };
            const rs = await instance.post('/refresh-token', data);

            return instance(originalConfig);
          } catch (_error) {
            window.location.href = '/sign-in';
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    },
  );
};

// eslint-disable-next-line require-await
const interceptConfig = async(config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  const token = LocalStorageService.getItem('auth');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

instance.interceptors.request.use(
  interceptConfig,
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async err => {
    const originalConfig = err.config;
    if (originalConfig.url !== '/auth/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const localRefreshToken = localStorage.getItem('refreshToken');
          const localToken = localStorage.getItem('token');

          const data = { refreshToken: localRefreshToken, token: localToken };

          const rs = await instance.post('/auth/refresh-token', data);
          const { token, refreshToken, errors } = rs.data;
          // eslint-disable-next-line max-depth
          if (errors) {
            localStorage.removeItem('auth');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  },
);
export default instance;
