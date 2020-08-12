import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from '../../config';
import { JwtPayload } from './dto/jwt-token.dto';
import { UserRO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

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
