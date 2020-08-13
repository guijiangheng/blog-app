import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
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

  async getUserProfile(userId: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['articles', 'followers', 'following'],
    });
  }

  async follow(follower: UserEntity, followingId: string): Promise<UserEntity> {
    if (follower.id === followingId) {
      throw new BadRequestException('不能关注自己');
    }

    const following = await this.userRepository.findOne({
      where: { id: followingId },
      relations: ['followers', 'following', 'articles'],
    });

    if (!following) {
      throw new NotFoundException('被关注者不存在');
    }

    if (following.followers.map(user => user.id).includes(follower.id)) {
      throw new BadRequestException('已经关注过用户');
    }

    following.followers.push(follower);

    return await this.userRepository.save(following);
  }

  async unFollow(
    follower: UserEntity,
    followingId: string,
  ): Promise<UserEntity> {
    if (follower.id === followingId) {
      throw new BadRequestException('不能取关自己');
    }

    const following = await this.userRepository.findOne({
      where: { id: followingId },
      relations: ['followers', 'following', 'articles'],
    });

    if (!following) {
      throw new NotFoundException('被关注着不存在');
    }

    const isFollowing = following.followers
      .map(user => user.id)
      .includes(follower.id);
    if (!isFollowing) {
      throw new BadRequestException('你还未关注该用户');
    }

    following.followers = following.followers.filter(
      user => user.id !== follower.id,
    );

    return await this.userRepository.save(following);
  }
}
