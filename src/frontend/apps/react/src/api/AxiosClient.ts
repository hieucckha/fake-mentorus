import axios, { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import localStorageService from '../services/localStorage.service';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',

  },
});

instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  const token = localStorageService.getItem('auth');
  if (token) {
  // eslint-disable-next-line no-param-reassign
    request.headers = new AxiosHeaders({
      ...request.headers,
      Authorization: `Bearer ${localStorageService.getItem('auth')}`,
    });
  }

  return request;
});

instance.interceptors.response.use((response: AxiosResponse) => response, async error => {
  const originalResponse = error.response;
  if (originalResponse.url !== '/api/auth' && error.response) {
    if (error.response.status === 401 && !originalResponse._retry) {
      originalResponse._retry = true;

      try {
        const oldToken = localStorageService.getItem('auth');

        const data = { token: oldToken };

        const rs = await instance.put('/api/auth', data);

        const { token } = rs.data;

        // eslint-disable-next-line max-depth
        if (rs.status === 401) {
          localStorage.removeItem('auth');
          window.location.href = '/login';
        }

        localStorage.setItem('auth', token);
                      return instance(originalResponse.config);
      } catch (_error) {
       return Promise.reject(_error);
    }
  }
  }

  return Promise.reject(error);
});

export default instance;
