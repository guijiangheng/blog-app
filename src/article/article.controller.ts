import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { UserEntity } from '../user/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleRO } from './dto/create-article-ro.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleEntity } from './article.entity';

@ApiTags('article')
@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '获取文章信息' })
  @ApiOkResponse({ type: ArticleEntity })
  @Get('articles/:articleId')
  getArticleById(
    @Param('articleId') articleId: string,
  ): Promise<ArticleEntity> {
    return this.articleService.getArticleById(articleId);
  }

  @ApiOperation({ summary: '创建文章' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CreateArticleRO })
  @Post('articles')
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @Req() req: Request,
  ): Promise<CreateArticleRO> {
    const author = req.user as UserEntity;
    return this.articleService.createArticle(author, createArticleDto);
  }

  @ApiOperation({ summary: '删除文章' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('articles/:articleId')
  async deleteArticle(
    @Param('articleId') articleId: string,
    @Req() req: Request,
  ): Promise<void> {
    const author = req.user as UserEntity;
    await this.articleService.deleteArticle(author, articleId);
  }
}
