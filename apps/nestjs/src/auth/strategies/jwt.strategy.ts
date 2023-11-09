import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { jwtConstants } from '../constants';

/**
 * Jwt strategy.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   *
   * @param payload Payload.
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public validate(payload: any): any {
    return { id: payload.sub, email: payload.email };
  }
}
