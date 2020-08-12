import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { UserService } from './../user/user.service';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    author: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity(createArticleDto);
    article.author = author;
    return await this.articleRepository.save(article);
  }
}
