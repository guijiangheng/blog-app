import { ApiProperty } from '@nestjs/swagger';

export class UserRO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;
}
