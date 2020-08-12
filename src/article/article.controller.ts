import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { UserRO } from './../user/dto/user.dto';
import { ArticleService } from './article.service';
import { CreateArticleRO } from './dto/create-article-ro.dto';
import { CreateArticleDto } from './dto/create-article.dto';

@ApiTags('article')
@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '创建文章' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: CreateArticleRO })
  @Post('articles')
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @Req() req: Request,
  ): Promise<CreateArticleRO> {
    const author = req.user as UserRO;
    return this.articleService.createArticle(author, createArticleDto);
  }
}
