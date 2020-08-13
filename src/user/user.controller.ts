import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
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
import { UserEntity } from './user.entity';

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

  @ApiOperation({ summary: '获取用户主页信息' })
  @ApiOkResponse({ type: UserEntity })
  @Get('users/:userId')
  async getUserProfile(@Param('userId') userId: string): Promise<UserEntity> {
    return this.userService.getUserProfile(userId);
  }

  @ApiOperation({ summary: '关注用户' })
  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('users/:userId/follow')
  async followUser(
    @Param('userId') userId: string,
    @Req() req: Request,
  ): Promise<UserEntity> {
    const follower = req.user as UserEntity;
    return this.userService.follow(follower, userId);
  }
}
