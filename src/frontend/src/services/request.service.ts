import axios from "../api/AxiosClient";
import { CreateRequestDto } from "../api/store/request/interface";

export class RequestService {
    public static async getAllRequest() {
        const response = await axios.get(`/api/request`);
        return response.data;
    }

    public static async getRequestById(id: string) {
        const response = await axios.get(`/api/request/${id}`);
        return response.data;
    }
    public static async createRequest(request: CreateRequestDto) {
        const response = await axios.post(`/api/request`, request);
        return response.data;
    }

    public static async updateRequest(id: string, request: CreateRequestDto) {
        const response = await axios.put(`/api/request/${id}`, request);
        return response.data;
    }

    public static async deleteRequest(id: string) {
        const response = await axios.delete(`/api/request/${id}`);
        return response.data;
    }
}