import { ApiProperty } from '@nestjs/swagger';

import { UserRO } from './../../user/dto/user.dto';

export class LoginRO {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserRO;
}
