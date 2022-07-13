import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'lastname' })
  lastname: string;

  @IsString()
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'lastname' })
  lastname: string;

  @IsString()
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;

}

export class UpdateUserBody {
  @ApiProperty()
  user: UpdateUserDTO;
}

export interface AuthPayload {
  username: string;
}
