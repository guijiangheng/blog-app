import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { LoginRO } from './../auth/dto/login-ro.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '当前用户' })
  @ApiOkResponse({ type: UserRO })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('users/current')
  async getCurrentUser(@Req() req: Request): Promise<UserRO> {
    return req.user as UserRO;
  }

  @ApiOperation({ summary: '创建用户' })
  @ApiOkResponse({ type: LoginRO })
  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<LoginRO> {
    return this.userService.create(createUserDto);
  }
}
