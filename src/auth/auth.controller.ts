import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserRO } from '../user/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body('user') user: UserRO): Promise<{ token: string }> {
    return this.authService.login(user);
  }
}
