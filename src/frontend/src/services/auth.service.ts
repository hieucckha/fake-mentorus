// AuthService.js
import axios from '../api/AxiosClient';

const AuthService = {
  async login(email: string, password: string) {
    const response = await axios.post('/api/auth', { email, password });
    return response.data;
  },

  async signup(email: string, password: string) {
    const response = await axios.post('/sign-up', { email, password });
    return response.data;
  },
};

export default AuthService;
