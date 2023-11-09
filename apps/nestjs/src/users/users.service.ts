import { Injectable } from '@nestjs/common';

import { AppDbContext } from '../config/prismas/prisma.service';

import { CreateUserRequest } from './dto/uses.dto';

import { User } from '@prisma/client';

/**
 * Users service.
 */
@Injectable()
export class UsersService {

  /**
   * Creates an instance of UsersService.
   * @param appDbContext The injected AppDbContext instance.
   * @memberof UsersService
   */
  public constructor(private appDbContext: AppDbContext) { }

  /**
   * Retrieves a list of all users.
   * @returns List of {@link User}.
   */
  public async getAll(): Promise<User[]> {
    const users = await this.appDbContext.user.findMany();

    return users;
  }

  /**
   * Creates a new user with the provided data.
   * @param request The user data to be used for creation.
   * @throws Error - If a user with the same email already exists.
   */
  public async create(request: CreateUserRequest): Promise<void> {
    const isExists = await this.appDbContext.user.findFirst({ where: { email: request.username } });
    if (isExists === null) {
      throw new Error('User already exists');
    }
    await this.appDbContext.user.create({
      data: {
        email: request.username,
        password: request.password,
      },
    });
  }
}
