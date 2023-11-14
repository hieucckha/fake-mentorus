import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

/**
 * App controller.
 */
@Controller()
export class AppController {
  /**
   *
   * @param req Request.
   * @returns
   */
  @UseGuards(AuthGuard('myJwt'))
  @Get('profile')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getProfile(@Req() req: any): string {
    return req.user;
  }
}
