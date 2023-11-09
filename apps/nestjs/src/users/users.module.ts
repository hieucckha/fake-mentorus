import { Module } from '@nestjs/common';

import { AppDbContext } from '../config/prismas/prisma.service';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/**
 * Users module.
 */
@Module({
  providers: [UsersService, AppDbContext],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
