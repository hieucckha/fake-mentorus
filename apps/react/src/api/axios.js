import axios from 'axios';

import LocalStorageService from '../services/localStorage.service';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

instance.interceptors.request.use(
  config => {
    const token = LocalStorageService.getItem('auth');

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  },
  error => Promise.reject(error),
);

export default instance;
