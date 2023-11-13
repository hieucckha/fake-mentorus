import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaService } from './prisma/prisma.service';

/**
 * App module.
 */
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    PrismaService, {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
