import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';

import { PrismaModule } from '../prisma/prisma.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './constants';

import { JwtStrategy } from './strategies/jwt.strategy';

/**
 * Auth module.
 */
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaModule,
  ],
  exports: [AuthService],
})
export class AuthModule { }
