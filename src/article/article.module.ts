import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/article/article.entity';

import { UserModule } from './../user/user.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([ArticleEntity])],
  providers: [ArticleService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
