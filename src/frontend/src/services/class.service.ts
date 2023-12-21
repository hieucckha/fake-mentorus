import { react } from '@vitejs/plugin-react-swc';
import { classDetailQuery } from './../api/store/class/queries';
import axios from "../api/AxiosClient";

import type {
	ClassDetail,
	ClassDto,
	ClassQuery,
	EditGradeDto,
	gradeCompositions,
	newGradeCompositions,
} from "../api/store/class/interface";

const classService = {
	async createClass(classData: ClassDto) {
		const response = await axios.post("/api/course", classData);
		return response.data;
	},
	async getAllClass(userId: Number): Promise<Array<ClassQuery>> {
		const response = await axios.get("/api/course/query", {
			params: { userId: userId },
		});

		return response.data.items;
	},
	async getClassDetail(classId: String): Promise<ClassDetail> {
		const response = await axios.get(`/api/course/${classId}`);

		return response.data;
	},
	async editClass(classQuery: ClassQuery) {
		const response = await axios.patch(`/api/course/${classQuery.id}`, {
			name: classQuery.name,
			description: classQuery.description
		});

		return response.data;
	},
	async joinClassByCode(classData: { code: string }) {
		const response = await axios.post("/api/course/join", {
			inviteCode: classData.code,
		});
		return response.data;
	},
	async joinCourseByInvitationLink(token: string) {
		const response = await axios.post("/api/course/invite-email/confirm", { token: token });
		return response;
	},
	async joinCourseByCode(code: string) {
		const response = await axios.post("/api/course/join", { inviteCode: code });
		return response;
	},
	async updateOrderGradeComposit(gradeCompositions: gradeCompositions[]) {
		const response = await axios.patch("/api/grade-composition/sort", {
			gradeCompositions: gradeCompositions,
		});
		return response.data;
	},
	async updateGradeColumn(gradeComposition: gradeCompositions) {
		const response = await axios.put(
			"/api/grade-composition/" + gradeComposition.id,
			{
				name: gradeComposition.name,
				description: gradeComposition.description,
				gradeScale: gradeComposition.gradeScale,
			}
		);
		return response.data;
	},

	async editGradeStudent(body: EditGradeDto) {
		const response = await axios.post("/api/grade", body);
		return response.data;
	},

	async addNewGradeComposit(composition: newGradeCompositions) {
		const response = await axios.post("/api/grade-composition", {
			gradeScale: composition.gradeScale,
			name: composition.name,
			courseId: composition.courseId,
			description: composition.description,
		});
		return response.data;
	},
	async deleteGradeComposit(id: Number) {
		const response = await axios.delete("/api/grade-composition/" + id);
		return response.data;
	},
	async inviteClassByEmail(classData: { email: string; courseId: string }) {
		const response = await axios.post(
			`api/course/${classData.courseId}/invite-email`,
			{ email: classData.email }
		);
		return response.data;
	},
	async downloadTemplate(classId: string) {
		if (!classId || classId === "") throw new Error("classId is required");
		const response = await axios.get(`/api/grade/template`, {
			params: { courseId: classId },
			responseType: "blob",
		});
		return response;
	},
	async uploadGradeFile(classId: string, file: File) {
		if (!classId || classId === "") throw new Error("classId is required");
		const formData = new FormData();
		formData.append("file", file);
		const response = await axios.post(
			`/api/grade/template/${classId}/import`,
			formData,
			{ headers: { "Content-Type": "multipart/form-data" } }
		);
		return response.data;
	},
	async getAllGrade(classId: string) {
		if (!classId || classId === "") throw new Error("classId is required");
		const response = await axios.get(`/api/grade/all`, { params: { courseId: classId } });
		// const response = {
		// 	data: {
		// 		courseId: 1,
		// 		gradeCompositionDtos: [
		// 			{
		// 				id: 1,
		// 				key: 1,
		// 				name: "mount",
		// 				courseId: 1,
		// 				description: "string",
		// 				isFinal: true,
		// 				gradeScale: 1,
		// 				order: 1,
		// 				createdAt: "string",
		// 				updatedAt: "string",
		// 			},
		// 			{
		// 				id: 2,
		// 				key: 2,
		// 				name: "midterm",
		// 				courseId: 1,
		// 				description: "string",
		// 				isFinal: true,
		// 				gradeScale: 1,
		// 				order: 1,
		// 				createdAt: "string",
		// 				updatedAt: "string",
		// 			},
		// 			{
		// 				id: 3,
		// 				key: 3,
		// 				name: "final",
		// 				courseId: 1,
		// 				description: "string",
		// 				isFinal: true,
		// 				gradeScale: 1,
		// 				order: 1,
		// 				createdAt: "string",
		// 				updatedAt: "string",
		// 			},
		// 		],
		// 		students: [
		// 			{
		// 				studentId: 1,
		// 				studentName: "string",
		// 				userId: 1,
		// 				gradeDto: [
		// 					{
		// 						id: 1,
		// 						gradeCompositionId: 1,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 2,
		// 						gradeCompositionId: 2,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 3,
		// 						gradeCompositionId: 3,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 				],
		// 			},
		// 			{
		// 				studentId: 2,
		// 				studentName: "string",
		// 				userId: 2,
		// 				gradeDto: [
		// 					{
		// 						id: 1,
		// 						gradeCompositionId: 1,
		// 						gradeValue: 9,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 2,
		// 						gradeCompositionId: 2,
		// 						gradeValue: 10,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 3,
		// 						gradeCompositionId: 3,
		// 						gradeValue: 8,
		// 						isRequest: true,
		// 					},
		// 				],
		// 			},
		// 			{
		// 				studentId: 3,
		// 				studentName: "string",
		// 				userId: 3,
		// 				gradeDto: [


		// 					{
		// 						id: 3,
		// 						gradeCompositionId: 3,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 				],
		// 			},
		//             {
		//                 studentId: 4,
		//                 studentName: "string",
		//                 userId: 4,
		//                 gradeDto: [
		//                     {
		//                         id: 1,
		//                         gradeCompositionId: 1,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 2,
		//                         gradeCompositionId: 2,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 3,
		//                         gradeCompositionId: 3,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                 ],
		//             },
		//             {
		//                 studentId: 5,
		//                 studentName: "string",
		//                 userId: 5,
		//                 gradeDto: [
		//                     {
		//                         id: 1,
		//                         gradeCompositionId: 1,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 2,
		//                         gradeCompositionId: 2,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 3,
		//                         gradeCompositionId: 3,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                 ],
		//             },
		//             {
		//                 studentId: 6,
		//                 studentName: "string",
		//                 userId: 6,
		//                 gradeDto: [
		//                     {
		//                         id: 1,
		//                         gradeCompositionId: 1,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 2,
		//                         gradeCompositionId: 2,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 3,
		//                         gradeCompositionId: 3,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                 ],
		//             },
		//             {
		//                 studentId: 7,
		//                 studentName: "string",
		//                 userId: 7,
		//                 gradeDto: [
		//                     {
		//                         id: 1,
		//                         gradeCompositionId: 1,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 2,
		//                         gradeCompositionId: 2,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 3,
		//                         gradeCompositionId: 3,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                 ],
		//             },
		//             {
		//                 studentId: 8,
		//                 studentName: "string",
		//                 userId: 8,
		//                 gradeDto: [
		//                     {
		//                         id: 1,
		//                         gradeCompositionId: 1,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 2,
		//                         gradeCompositionId: 2,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 3,
		//                         gradeCompositionId: 3,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                 ],
		//             },
		//             {
		//                 studentId: 9,
		//                 studentName: "string",
		//                 userId: 9,
		//                 gradeDto: [
		//                     {
		//                         id: 1,
		//                         gradeCompositionId: 1,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 2,
		//                         gradeCompositionId: 2,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 3,
		//                         gradeCompositionId: 3,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                 ],
		//             },
		//             {
		//                 studentId: 10,
		//                 studentName: "string",
		//                 userId: 10,
		//                 gradeDto: [
		//                     {
		//                         id: 1,
		//                         gradeCompositionId: 1,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 2,
		//                         gradeCompositionId: 2,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                     {
		//                         id: 3,
		//                         gradeCompositionId: 3,
		//                         gradeValue: 1,
		//                         isRequest: true,
		//                     },
		//                 ],
		//             },
		//             {
		// 				studentId: 3,
		// 				studentName: "string",
		// 				userId: 3,
		// 				gradeDto: [
		// 					{
		// 						id: 1,
		// 						gradeCompositionId: 1,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 2,
		// 						gradeCompositionId: 2,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 3,
		// 						gradeCompositionId: 3,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 				],
		// 			},
		//             {
		// 				studentId: 3,
		// 				studentName: "string",
		// 				userId: 3,
		// 				gradeDto: [
		// 					{
		// 						id: 1,
		// 						gradeCompositionId: 1,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 2,
		// 						gradeCompositionId: 2,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 3,
		// 						gradeCompositionId: 3,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 				],
		// 			},
		//             {
		// 				studentId: 3,
		// 				studentName: "string",
		// 				userId: 3,
		// 				gradeDto: [
		// 					{
		// 						id: 1,
		// 						gradeCompositionId: 1,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 2,
		// 						gradeCompositionId: 2,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 					{
		// 						id: 3,
		// 						gradeCompositionId: 3,
		// 						gradeValue: 1,
		// 						isRequest: true,
		// 					},
		// 				],
		// 			},
		// 		],
		// 	},
		// };
		return response.data;
	},
	async importStudent(classId: string, file: File) {
		if (!classId || classId === "") throw new Error("classId is required");
		const formData = new FormData();
		formData.append("file", file);
		const response = await axios.post(
			`/api/grade/student/template/${classId}/import`,
			formData,
			{ headers: { "Content-Type": "multipart/form-data" } }
		);
		return response.data;
	},
	async getOneGradeStudent(classId: string, studentId: string) {
		if (!classId || classId === "") throw new Error("classId is required");
		const response = await axios.get(`/api/grade/course/${classId}/student/${studentId}`);
		return response.data;
	}
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
