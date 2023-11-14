import { Body, Controller, Get, Param, Post, Patch, UseGuards } from '@nestjs/common';

import { User } from '@prisma/client';

import { AuthGuard } from '@nestjs/passport';

import { Public } from '../decorators/public';

import { UsersService } from './users.service';

import { CreateUserRequest, UpdateUserRequest } from './dto/uses.dto';

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

  /**
   * Update user.
   * @param id The user id.
   * @param request The {@link UpdateUserRequest} request.
   * @returns
   * @throws
   */
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() request: UpdateUserRequest): Promise<void> {
    const idNumber = parseInt(id, 10);

    await this.usersService.update(idNumber, request);
  }
}
