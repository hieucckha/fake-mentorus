import { editUserDto } from './../api/store/auth/interface';
import axios from "../api/AxiosClient";
import { UserProfileDto } from "../api/store/auth/interface";

const userService = {
	async create(username: string, password: string) {
		const response = await axios.post("/users", { username, password });
		return response.data;
	},
	async getProfile(): Promise<UserProfileDto> {
		const response = await axios.get("api/auth");
		return response.data;
	},
	async updateProfile(user: editUserDto) {
		const response = await axios.put("/api/user", user);
		return response.data;
	},
};
export default userService;
