import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

/**
 * App controller.
 */
@Controller()
export class AppController {
  public constructor() { }

  /**
   *
   * @param req Request.
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getProfile(@Req() req: any): string {
    return req.user;
  }
}
