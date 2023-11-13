import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

/**
 * Prisma module.
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
