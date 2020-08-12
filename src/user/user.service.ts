import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRO } from './dto/user.dto';

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

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.username = username;
    newUser.password = password;

    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<UserRO[]> {
    return this.userRepository.find();
  }
}
