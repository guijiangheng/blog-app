import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';

import { JWT_SECRET } from '../../config';
import { UserRO } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './dto/jwt-token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<UserRO> {
    const { id } = jwtPayload;
    return this.userService.getUserById(id);
  }
}
