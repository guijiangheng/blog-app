import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserRO } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserRO> {
    const { email, username, password } = createUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException('邮箱被占用');
    }

    const newUser = new UserEntity({
      email,
      username,
      password,
    });

    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<UserRO[]> {
    return this.userRepository.find();
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserById(userId: string): Promise<UserRO> {
    return this.userRepository.findOne(userId);
  }
}
