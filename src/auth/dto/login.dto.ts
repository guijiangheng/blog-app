import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @MinLength(6)
  readonly password: string;
}
