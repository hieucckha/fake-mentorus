import axios from "../api/AxiosClient";

import type { ClassDto,ClassQuery } from "../api/store/class/interface";

const classService = {
    async createClass(classData: ClassDto) {
        const response = await axios.post('/api/course', classData);
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
    async getAllClass(userId:Number): Promise<Array<ClassQuery>> {
        // const response = await axios.get('/class', {params: {userId}});
        const response = { data: [
            
            {
                id: 1,
                name: "Lớp 9",
                description: "Lớp 9",
            },
            {
                id: 2,
                name: "Lớp 10",
                description: "Lớp 10",
            },
            {
                id: 3,
                name: "Lớp 11",
                description: "Lớp 11",
            },
            {
                id: 4,
                name: "Lớp 12",
                description: "Lớp 12",
            },
            
        ] };

    
        return response.data;
    }

};
export default classService;
