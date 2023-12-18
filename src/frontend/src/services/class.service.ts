import axios from "../api/AxiosClient";

import type { ClassDetail, ClassDto,ClassQuery, gradeCompositions, newGradeCompositions } from "../api/store/class/interface";

const classService = {
    async createClass(classData: ClassDto) {
        const response = await axios.post('/api/course', classData);
        return response.data;
    },
    async getAllClass(userId:Number): Promise<Array<ClassQuery>> {
        const response = await axios.get('/api/course/query', {params: {userId: userId}});
        console.log(response.data);
      
        return response.data.items;
    },
    async getClassDetail(classId:String): Promise<ClassDetail> {
        const response = await axios.get(`/api/course/${classId}`);
       
        return response.data;
       
    },
    async joinClassByCode(classData:{code:string}) {
        const response = await axios.post('/api/course/join', {inviteCode: classData.code});
        return response.data;
    },
    async updateOrderGradeComposit(gradeCompositions:gradeCompositions[]) {
        console.log("Call api update order grade")
        const response = await axios.patch('/api/grade-composition/sort', {gradeCompositions: gradeCompositions});
        return response.data;
    },
    async updateGradeColumn(gradeComposition:gradeCompositions) {
        console.log("Call api update column grade")
        const response = await axios.put('/api/grade-composition/'+ gradeComposition.id, {
            name: gradeComposition.name,
            description: gradeComposition.description,
            gradeScale: gradeComposition.gradeScale,
        });
        return response.data;
    },
    async addNewGradeComposit(composition:newGradeCompositions) {
        console.log("addNewGradeComposit")
        const response = await axios.post('/api/grade-composition', {
            gradeScale: composition.gradeScale,
            name: composition.name,
            courseId: composition.courseId,
            description: composition.description
        });
        return response.data;
    },
    async deleteGradeComposit(id:Number) {
        console.log("deleteGradeComposit")
        const response = await axios.delete('/api/grade-composition/'+id);
        return response.data;
    },
    async inviteClassByEmail(classData:{email:string, courseId:string}) {
        const response = await axios.post(`api/course/${classData.courseId}/invite-email`, {email: classData.email});
        return response.data;
    },
    async downloadTemplate(classId:string) {
        if(!classId || classId === "") 
            throw new Error("classId is required");
        const response = await axios.get(`/api/grade/template`, {params: {courseId: classId}, responseType: 'blob'});
        return response.data;
    },
    async uploadGradeFile(classId:string, file:File) {
        if(!classId || classId === "") 
            throw new Error("classId is required");
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(`/api/grade/template/${classId}/import`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
        return response.data;
    },
    async getAllGrade(classId:string) {
        if(!classId || classId === "") 
            throw new Error("classId is required");
        const response = await axios.get(`/api/grade/all`, {params: {courseId: classId}});
        return response.data;
    },

};
export default classService;
// function generateArray(count:number) {
//     const result = [];

//     for (let i = 1; i <= count; i++) {
//         result.push({
//             id: i,
//             name: `Edward ${i}`,
//             gradeScale: Math.ceil(100 - Math.random() * 30),
//             description: `London Park no. ${i}`,
//             courseId: 0,
//             order: i,
//             createdAt: "stringnumber",
//             updatedAt: "stringnumber",
//         });
//     }

//     return result;
// }