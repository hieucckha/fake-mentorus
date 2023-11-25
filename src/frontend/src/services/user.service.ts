import axios from '../api/AxiosClient';
import { UserProfileDto } from '../api/store/auth/interface';

const userService = {
  async create(username: string, password: string) {
    const response = await axios.post('/users', { username, password });
    return response.data;
  },
  async getProfile(): Promise<UserProfileDto> {
    const response = await axios.get('api/auth');
    return response.data;
  },
  async updateProfile(user: UserProfileDto): Promise<UserProfileDto> {
    const response = await axios.patch(`/users/${user.id}`, user);
    return response.data;
  },
};
export default userService;
