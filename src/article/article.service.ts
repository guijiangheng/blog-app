import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async getArticleById(articleId: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['author'],
    });

    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    return article;
  }

  async createArticle(
    author: UserEntity,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity(createArticleDto);
    article.author = author;
    return await this.articleRepository.save(article);
  }

  async deleteArticle(
    author: UserEntity,
    articleId: string,
  ): Promise<DeleteResult> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['author'],
    });

    this.checkArticleAuthor(article, author);

    return await this.articleRepository.delete(articleId);
  }

  private checkArticleAuthor(article: ArticleEntity, author: UserEntity): void {
    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    if (article.author.id !== author.id) {
      throw new UnauthorizedException('不是文章的作者');
    }
  }
}
