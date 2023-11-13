import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/**
 * Users module.
 */
@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
