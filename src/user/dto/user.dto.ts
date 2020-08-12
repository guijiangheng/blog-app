import { ApiProperty } from '@nestjs/swagger';

export class UserRO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;
}
