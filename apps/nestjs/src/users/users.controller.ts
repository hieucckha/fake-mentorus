import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { User } from '@prisma/client';

import { AuthGuard } from '@nestjs/passport';

import { Public } from '../decorators/public';

import { UsersService } from './users.service';

import { CreateUserRequest } from './dto/uses.dto';

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
  @UseGuards(AuthGuard('myJwt'))
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
