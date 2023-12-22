export interface ClassListQuery {
	id: number;
	name: string;
	description: string;
    isActivated:	boolean;
    createdAt: string;
    updatedAt: string;
    creatorId: number;
    creatorName: string;
    numberOfStudents: number;
    numberOfTeachers: number;
}