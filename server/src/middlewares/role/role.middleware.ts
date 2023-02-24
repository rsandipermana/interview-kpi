import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserRole } from 'src/constants/user-roles.constant';
import { UserDocument } from 'src/entities/schemas/user.schema';

export interface AuthenticatedRequest extends Request {
  user: UserDocument;
}

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  constructor(private readonly requiredRole: UserRole) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const user = req.user as UserDocument;

    if (user.role !== this.requiredRole) {
      throw new ForbiddenException(
        'You do not have permission to perform this action',
      );
    }

    next();
  }
}
