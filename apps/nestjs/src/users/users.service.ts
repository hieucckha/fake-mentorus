import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserRequest, UpdateUserRequest } from './dto/uses.dto';

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
  public constructor(private appDbContext: PrismaService) { }

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
    if (isExists) {
      throw new Error('User already exists');
    }
    await this.appDbContext.user.create({
      data: {
        email: request.username,
        password: request.password,
      },
    });
  }

  /**
   * @param id The user id.
   * @param request The user data to be used for update.
   * @throws Error - If a user with the same email already exists.
   * @throws Error - If a user with the same id not found.
   * @returns
   */
  public async update(id: number, request: UpdateUserRequest): Promise<void> {
    const isExists = await this.appDbContext.user.findFirst({ where: { id } });
    if (!isExists) {
      throw new Error('User not found');
    }
    await this.appDbContext.user.update({
      where: { id },
      data: {
        email: request.email,
        name: request.username,
        sex: request.sex,
      },
    });
  }
}
