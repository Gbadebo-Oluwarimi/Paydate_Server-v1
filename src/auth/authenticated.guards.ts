import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // console.log(request.sessionID);
    console.log('testing the authenticated route', request.isAuthenticated());
    return request.isAuthenticated();
  }
}
