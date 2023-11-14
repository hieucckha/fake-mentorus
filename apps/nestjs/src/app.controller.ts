import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { User } from '@prisma/client';

import { PrismaService } from './prisma/prisma.service';

/**
 * App controller.
 */
@Controller()
export class AppController {
  public constructor(private readonly prismaService: PrismaService) { }

  /**
   *
   * @param req Request.
   * @returns
   */
  @UseGuards(AuthGuard('myJwt'))
  @Get('profile')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getProfile(@Req() req: any): Promise<User> {
    const userId = req.user.id;

    const user = await this.prismaService.user.findFirst({ where: { id: userId } });

    if (user === null) {
      throw new Error('User not found');
    }

    return user;
  }
}
