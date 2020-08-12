import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserRO } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserRO> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('密码错误');
    }

    delete user.password;

    return user;
  }

  sign(user: UserRO): string {
    const { id, email, username } = user;
    return this.jwtService.sign({ id, email, username });
  }
}
