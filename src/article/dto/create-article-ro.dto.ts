import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserRO } from './../../user/dto/user.dto';

export class CreateArticleRO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  author: UserRO;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
