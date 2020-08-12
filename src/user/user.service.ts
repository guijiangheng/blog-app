import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuthService } from './../auth/auth.service';
import { LoginRO } from './../auth/dto/login-ro.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<LoginRO> {
    const { email, username, password } = createUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new BadRequestException('邮箱被占用');
    }

    const newUser = new UserEntity({ email, username, password });
    const savedUser = await this.userRepository.save(newUser);
    delete savedUser.password;

    return {
      user: savedUser,
      token: this.authService.sign(savedUser),
    };
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOne(userId);
  }
}
