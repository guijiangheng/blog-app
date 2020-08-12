import {
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
    return user;
  }

  login(user: UserRO): { token: string } {
    const { id: sub, email, username } = user;
    return {
      token: this.jwtService.sign({ sub, email, username }),
    };
  }
}
