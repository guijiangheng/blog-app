import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleEntity } from '../article/article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @Index({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ type: () => [ArticleEntity] })
  @OneToMany(
    () => ArticleEntity,
    article => article.author,
  )
  articles: ArticleEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }

  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
