import { AuthGuard } from '@nestjs/passport';

/**
 * Local guard.
 */
export class LocalGuard extends AuthGuard('local') {}
