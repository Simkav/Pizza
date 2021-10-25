import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotAnAdmin } from './errors/NotAnAdmin';

@Injectable()
export class isAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { userObj } = context.switchToHttp().getRequest();
    if (!userObj.isAdmin) {
      throw new NotAnAdmin();
    }
    return true;
  }
}
