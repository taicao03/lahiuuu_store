import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRoles } from '../users/enums/user.enum';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.findOne(id);
      return user.role === UserRoles.ADMIN;
    }

    return false;
  }
}
