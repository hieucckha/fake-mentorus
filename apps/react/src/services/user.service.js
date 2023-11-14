import axios from '../api/axios';

const userService = {
  async create(username, password) {
    const response = await axios.post('/users', { username, password });
    return response.data;
  },
  async getProfile() {
    const response = await axios.get('/profile');
    return response.data;
  },
};
export default userService;
