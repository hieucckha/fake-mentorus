import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { LoginResponse } from './dto/auth.dto';

/**
 * Auth service.
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * @param jwtService - The JWT service for token generation and verification.
   * @param appDbContext - The application database context.
   */
  public constructor(
    private jwtService: JwtService,
    private appDbContext: PrismaService,
  ) { }

  /**
   * Validates a user's credentials and returns the user if valid.
   * @param username The username for authentication.
   * @param password The password for authentication.
   * @returns Object or null if validation fails.
   * @throws Error - If the user is not found.
   */
  public async validateUser(username: string, password: string): Promise<User | null> {
    const user: User | null = await this.appDbContext.user.findFirst({ where: { email: username } });

    if (user === undefined || user === null) {
      throw new Error('User not found');
    }

    if (user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Creates a JWT token for the provided user data.
   * @param user The user for whom the token is being created.
   * @returns A {@link LoginResponse} containing the JWT token.
   */
  public createJwtToken(user: Partial<User>): LoginResponse {
    const payload = { email: user.email, sub: user.id };

    const response: LoginResponse = {
      token: this.jwtService.sign(payload),
    };

    return response;
  }
}
