import axios from '../api/AxiosClient';

import type { ClassDto } from '../api/store/class/interface';

const classService = {
    async createClass(classData: ClassDto) {
        const response = await axios.post('/class', classData);
        return response.data;
    },
    // async getDetailClass(): Promise<ClassDto> {
    //     const response = await axios.get('api/class');
    //     return response.data;
    // },
    // async updateClass(classData: ClassDto): Promise<ClassDto> {
    //     const response = await axios.patch(`/class/${classData.id}`, classData);
    //     return response.data;
    // },
    async getAllClass(): Promise<Array<ClassDto>> {
        const response = await axios.get('/class');
        return response.data;
    }

};
export default classService;