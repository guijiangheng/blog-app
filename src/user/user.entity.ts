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

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

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
