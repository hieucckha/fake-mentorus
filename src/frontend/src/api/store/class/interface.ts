export interface ClassDto {
	name: string;
	description: string;
}
export interface ClassQuery {
	id: number;
	name: string;
	description: string;
}
export interface Teacher{
	id: number;
	fullName: string;
	role: string;
}
export interface Student  {
	id: number;
	fullName: string;
	role: string;
}
export interface gradeCompositions {
	id: number;
	key: number;
	name: string;
	courseId: number;
	description: string;
	gradeScale: number;
	order: number;
	createdAt: string;
	updatedAt: string;
}
export interface newGradeCompositions {
	name: string;
	courseId: number;
	description: string;
	gradeScale: number;
}

export enum RequestStatus {
	Pending = "Pending",
	Approved = "Approved",
	Rejected = "Rejected",
}
export interface requests{
	id: number;
	studentId: number;
	studentName: string;
	classId: number;
	reason: string;
	createdAt: string;
	updatedAt: string;
	status: RequestStatus;
}
export interface ClassDetail {
	id: number;
	name: string;
	description: string;
	inviteCode: string;
	inviteLink: string;
	numberOfStudents: number;
	numberTeacher: number;
	teachers: Teacher[];
	students: Student[];
	gradeCompositions: gradeCompositions[];
	requests: requests[];

}
export interface gradeCompositionsDto {
	id: number;
	key: number;
	name: string;
	courseId: number;
	description: string;
	isFinal: boolean;
	gradeScale: number;
	order: number;
	createdAt: string;
	updatedAt: string;
}
export interface GradeDTO {
	id:number;
	gradeCompositionId: number;
	gradeValue: number;
	isRequest: boolean;
}
export interface studentGradeDto{
	studentId: number;
	studentName: string;
	userId: number;
	gradeDto: GradeDTO[];
}
export interface gradeAll{
	courseId: number;
	gradeCompositionDtos: gradeCompositionsDto[];
	students: studentGradeDto[];
}

export interface EditGradeDto {
  gradeCompositionId: number;
  studentId: string;
  gradeValue: number;
}
