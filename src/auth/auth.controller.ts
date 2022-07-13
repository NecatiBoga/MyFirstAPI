import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from '../models/user.model';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({ description: 'User Registration' })
  @ApiBody({ type: RegisterDTO })
  async register(@Body(ValidationPipe) credentials: RegisterDTO) {
    const data = await this.authService.register(credentials);
    const status = await this.authService.success;
    const message = await this.authService.message;
    return { status,message,data };
  }

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginDTO })
  async login(@Body(ValidationPipe) credentials: LoginDTO) {
    const data = await this.authService.login(credentials);
    const status = await this.authService.success;
    const message = await this.authService.message;
    return { status,message,data };
  }
}
