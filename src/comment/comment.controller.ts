import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  @ApiOperation({ summary: '测试' })
  @Get()
  getHello(): string {
    return 'hehe';
  }
}
