/**
 * Signin data.
 * @interface
 * @property {String} email - User email.
 * @property {String} password - User password.
 */
export interface SigninData {

  /**
   * User email.
   */
    email: string;

    /**
     * User password.
     */
    password: string;
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
}
