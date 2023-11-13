// AuthService.js
import axios from '../api/axios';

const AuthService = {
  async login(email, password) {
    const response = await axios.post('/sign-in', { email, password });
    return response.data;
  },

  async signup(email, password) {
    const response = await axios.post('/sign-up', { email, password });
    return response.data;
  },
};

export default AuthService;
