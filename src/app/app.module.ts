import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
