export interface ClassDto {
	name: string;
	description: string;
}
export interface ClassQuery {
	id: number;
	name: string;
	description: string;
}
export interface ClassDetail {
	id: number;
	name: string;
	description: string;
	inviteCode: string;
	numberOfStudents: number;
	numberTeacher: number;

}