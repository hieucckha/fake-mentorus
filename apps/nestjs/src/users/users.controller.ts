import { Body, Controller, Get, Post } from '@nestjs/common';

import { Public } from '../config/decorators/public';

import { UsersService } from './users.service';

import { CreateUserRequest } from './dto/uses.dto';

import { User } from '@prisma/client';

/**
 * Users controller.
 */
@Controller('users')
export class UsersController {
  public constructor(private usersService: UsersService) { }

  /**
   *
   * @returns
   */
  @Get()
  public getAllUser(): Promise<User[]> {
    return this.usersService.getAll();
  }

  /**
   * Create user.
   * @param request The {@link CreateUserRequest} request.
   */
  @Public()
  @Post()
  public async create(@Body() request: CreateUserRequest): Promise<void> {
    await this.usersService.create(request);
  }
}
