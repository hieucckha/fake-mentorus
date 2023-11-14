import { Prisma } from '@prisma/client';

/**
 *
 */
export type AuthUser = Required<Pick<Prisma.UserCreateInput, 'email' | 'password' >>;

/**
 *
 */
export type CreateUserByEmail = Partial<Prisma.UserCreateInput> & AuthUser;

/**
 *
 */
export interface CreateUserRequest {

  /**
   * User name (email).
   */
  username: string;

  /**
   * Password.
   */
  password: string;
}

/**
 *
 */
export interface UpdateUserRequest {

  /**
   * User name (email).
   */
  username: string;

  /**
   * Email.
   */
  email: string;

  /**
   * Sex.
   */
  sex: boolean;
}
