import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LoginResponse } from './dto/auth.dto';

/**
 * Auth controller.
 */
@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) { }

  /**
   * Login.
   * @param request Request.
   * @returns
   */
    @UseGuards(AuthGuard('local'))
    @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public login(@Req() request: any): LoginResponse {
    const { user } = request;

    return this.authService.createJwtToken(user);
  }
}
