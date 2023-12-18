/**
 * Signin data.
 * @interface
 * @property {String} email - User email.
 * @property {String} password - User password.
 */
export interface SignInData {
	/**
	 * User email.
	 */
	email: string;

	/**
	 * User password.
	 */
	password: string;
}

/**
 * Sign in with Google
 */
export interface SignInGoogleData {
	/**
	 * Credential for Google sign in.
	 */
	credential: string;
}

/**
 * Sign in with Facebook
 */
export interface SignInFacebookData {
	/**
	 * Access token for Facebook sign in.
	 */
	accessToken: string;
}

export interface UserProfileDto {
	/**
	 * User name.
	 */
	fullName: string;

	/**
	 * User id.
	 */
	id: number;

	/**
	 * User name.
	 */
	email: string;

	/**
	 * Sex.
	 */
	studentId: string;
	role: string;
}

export interface signUpDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	studentId: string;
}
export interface resetPasswordDto {
	email: string;
}

export interface resetPasswordConfirmDto {
	email: string;
	code: string;
	password: string;
	confirmPassword: string;
}

export enum UserRole {
	Teacher = "Teacher",
	Student = "Student"
}