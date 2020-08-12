import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsEmail, MinLength, IsString, IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @MinLength(6)
  readonly password: string;
}
