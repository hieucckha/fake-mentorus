import axios from '../api/axios';

/**
 * User profile data transfer object.
 */
interface UserProfileDto {

  /**
   * User name.
   */
  name: string;

  /**
   * User id.
   */
  id: number;

  /**
   * User name.
   */
  email: string;

  /**
   * Sex.
   */
 sex: boolean;
}

const userService = {
  async create(username: string, password: string) {
    const response = await axios.post('/users', { username, password });
    return response.data;
  },
  async getProfile(): Promise<UserProfileDto> {
    const response = await axios.get('/profile');
    return response.data;
  },
  async updateProfile(userId: number, profile: {
    name: string;
    sex: boolean;
    email: string;
}): Promise<UserProfileDto> {
    const response = await axios.patch(`/users/${userId}`, profile);
    console.log(response.data);
    return response.data;
  },
};
export default userService;
