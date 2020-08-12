import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @ManyToOne(
    () => UserEntity,
    user => user.articles,
  )
  author: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(article: Partial<ArticleEntity>) {
    Object.assign(this, article);
  }
}
