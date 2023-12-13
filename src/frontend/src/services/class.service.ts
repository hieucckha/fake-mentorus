import axios from "../api/AxiosClient";

import type { ClassDetail, ClassDto,ClassQuery } from "../api/store/class/interface";

const classService = {
    async createClass(classData: ClassDto) {
        const response = await axios.post('/api/course', classData);
        return response.data;
    },
    async getAllClass(userId:Number): Promise<Array<ClassQuery>> {
        const response = await axios.get('/api/course/query', {params: {userId: userId}});
        console.log(response.data);
        // console.log(userId);
        // const response = { data: [
            
        //     {
        //         id: 1,
        //         name: "Lớp 9",
        //         description: "Lớp 9",
        //     },
        //     {
        //         id: 2,
        //         name: "Lớp 10",
        //         description: "Lớp 10",
        //     },
        //     {
        //         id: 3,
        //         name: "Lớp 11",
        //         description: "Lớp 11",
        //     },
        //     {
        //         id: 4,
        //         name: "Lớp 12",
        //         description: "Lớp 12",
        //     },
            
        // ] };
        return response.data.items;
    },
    async getClassDetail(classId:String): Promise<ClassDetail> {
        const response = await axios.get(`/api/course/${classId}`);
        // const response = { data: {
        //     id: 1,
        //     name: "Lớp 9",
        //     description: "Lớp 9",
        //     inviteCode: "1234567891234",
        //     inviteLink: "https://google.com",
        //     numberOfStudents: 50,
        //     numberTeacher: 5,
        //     teachers: [
        //         {
        //             id: 1,
        //             fullName: "Nguyễn Văn A",
        //             role: "Giáo viên chủ nhiệm",
        //         },
        //         {
        //             id: 2,
        //             fullName: "Nguyễn Văn B",
        //             role: "Giáo viên dạy toán",
        //         },
        //         {
        //             id: 3,
        //             fullName: "Nguyễn Văn C",
        //             role: "Giáo viên dạy văn",
        //         },
        //         {
        //             id: 4,
        //             fullName: "Nguyễn Văn D",
        //             role: "Giáo viên dạy hóa",
        //         },
        //         {
        //             id: 5,
        //             fullName: "Nguyễn Văn E",
        //             role: "Giáo viên dạy lý",
        //         },
        //     ],
        //     student: [
        //         {
        //             id: 1,
        //             fullName: "Nguyễn Văn A",
        //             role: "Học sinh",
        //         },
        //         {
        //             id: 2,
        //             fullName: "Nguyễn Văn B",
        //             role: "Học sinh",
        //         },
        //         {
        //             id: 3,
        //             fullName: "Nguyễn Văn C",
        //             role: "Học sinh",
        //         },
        //         {
        //             id: 4,
        //             fullName: "Nguyễn Văn D",
        //             role: "Học sinh",
        //         },
        //         {
        //             id: 5,
        //             fullName: "Nguyễn Văn E",
        //             role: "Học sinh",
        //         },
        //         {
        //             id: 6,
        //             fullName: "Nguyễn Văn F",
        //             role: "Học sinh",
        //         },
        //         {
        //             id: 7,
        //             fullName: "Nguyễn Văn G",
        //             role: "Học sinh",
        //         },
        //         {
        //             id: 8,
        //             fullName: "Nguyễn Văn H",
        //             role: "Học sinh",
        //         }, 
        //     ],
        //     gradeCompositions: [
        //         {
        //             id: 1,
        //             name: "Điểm miệng",
        //             courseId: 1,
        //             description: "Điểm miệng",
        //             gradeScale: 10,
        //             order: 1,
        //             createdAt: "2021-10-11T09:23:56.000Z",
        //             updatedAt: "2021-10-11T09:23:56.000Z",
        //         },
        //         {
        //             id: 2,
        //             name: "Điểm 15 phút",
        //             courseId: 1,
        //             description: "Điểm 15 phút",
        //             gradeScale: 10,
        //             order: 2,
        //             createdAt: "2021-10-11T09:23:56.000Z",
        //             updatedAt: "2021-10-11T09:23:56.000Z",
        //         },
        //         {
        //             id: 3,
        //             name: "Điểm 1 tiết",
        //             courseId: 1,
        //             description: "Điểm 1 tiết",
        //             gradeScale: 10,
        //             order: 3,
        //             createdAt: "2021-10-11T09:23:56.000Z",
        //             updatedAt: "2021-10-11T09:23:56.000Z",
        //         },
        //         {
        //             id: 4,
        //             name: "Điểm thi học kì",
        //             courseId: 1,
        //             description: "Điểm thi học kì",
        //             gradeScale: 10,
        //             order: 4,
        //             createdAt: "2021-10-11T09:23:56.000Z",
        //             updatedAt: "2021-10-11T09:23:56.000Z",
        //         },
        //     ],
        //     requests: [
        //         {
        //             id: 1,
        //             studentId: 1,
        //             studentName: "Nguyễn Văn A",
        //             classId: 1,
        //             reason: "Lý do 1",
        //             createdAt: "2021-10-11T09:23:56.000Z",
        //             updatedAt: "2021-10-11T09:23:56.000Z",
        //         },
        //         {
        //             id: 2,
        //             studentId: 2,
        //             studentName: "Nguyễn Văn B",
        //             classId: 1,
        //             reason: "Lý do 2",
        //             createdAt: "2021-10-11T09:23:56.000Z",
        //             updatedAt: "2021-10-11T09:23:56.000Z",
        //         },
        //         {
        //             id: 3,
        //             studentId: 3,
        //             studentName: "Nguyễn Văn C",
        //             classId: 1,
        //             reason: "Lý do 3",
        //             createdAt: "2021-10-11T09:23:56.000Z",
        //             updatedAt: "2021-10-11T09:23:56.000Z",
        //         },
        //         {
        //             id: 4,
        //             studentId: 4,
        //             studentName: "Nguyễn Văn D",
        //             classId: 1,
        //             reason: "Lý do 4",
        //             createdAt: "2021-10-11T09:23:56.000Z",
        //             updatedAt: "2021-10-11T09:23:56.000Z",
        //         },
        //     ],
        // } }; 
        return response.data;
    },
    async joinClassByCode(classData:{code:string}) {
        const response = await axios.post('/api/course/'+ classData.code +'/join',);
        return response.data;
    },

};
export default classService;
