import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';

import { UserRO } from '../user/dto/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    if (!(await verify(user.password, password))) {
      throw new UnauthorizedException('密码错误');
    }

    return user;
  }

  sign(user: UserRO): string {
    const { id, email, username } = user;
    return this.jwtService.sign({ id, email, username });
  }
}
