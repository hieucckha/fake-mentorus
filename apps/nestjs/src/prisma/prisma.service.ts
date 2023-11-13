import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * @description This is a service.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * @description This is a service.
   */
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
