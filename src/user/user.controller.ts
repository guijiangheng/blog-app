import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserRO } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('user')
@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户列表' })
  @ApiOkResponse({ type: [UserRO] })
  @Get('users')
  async getAllUsers(): Promise<UserRO[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: '创建用户' })
  @ApiOkResponse({ type: UserRO })
  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserRO> {
    return this.userService.create(createUserDto);
  }
}