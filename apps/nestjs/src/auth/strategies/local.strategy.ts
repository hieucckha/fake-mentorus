import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ModuleRef } from '@nestjs/core';

import { User } from '@prisma/client';

import { AuthService } from '../auth.service';

/**
 *
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public constructor(private authService: AuthService, private moduleRef: ModuleRef) {
    super({
      usernameField: 'email',
    });
  }

  /**
   *
   * @param username Username.
   * @param password Password.
   * @param request Request.
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
