import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UserRO } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginRO } from './dto/login-ro.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginRO })
  @Post('login')
  login(@Req() req: Request): LoginRO {
    const user = req.user as UserRO;
    return {
      user,
      token: this.authService.sign(user),
    };
  }
}
