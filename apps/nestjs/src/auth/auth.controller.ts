import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalGuard } from './guards/local.guard';
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
    @UseGuards(LocalGuard)
    @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public login(@Req() request: any): LoginResponse {
    const { user } = request;

    return this.authService.createJwtToken(user);
  }
}
