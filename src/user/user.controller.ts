import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserBody, UpdateUserDTO } from 'src/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Current user' })
  @ApiUnauthorizedResponse()
  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(@User() { username }: UserEntity) {
    const data = await this.userService.findByUsername(username);
    return { data };
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update current user' })
  @ApiUnauthorizedResponse()
  @ApiBody({ type: UpdateUserBody })
  @Put()
  @UseGuards(AuthGuard())
  update(
    @User() { username }: UserEntity,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    data: UpdateUserDTO,
  ) {
    return this.userService.updateUser(username, data);
  }
}
