// import {
//   Controller,
//   Delete,
//   Get,
//   NotFoundException,
//   Param,
//   Post,
//   UseGuards,
//   HttpCode,
// } from '@nestjs/common';
// import {
//   ApiOkResponse,
//   ApiUnauthorizedResponse,
//   ApiBearerAuth,
// } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// import { User } from 'src/auth/user.decorator';
// import { UserEntity } from 'src/entities/user.entity';
// import { UserService } from './user.service';
// import { OptionalAuthGuard } from 'src/auth/optional-auth.gaurd';

// @Controller('profiles')
// export class ProfileController {
//   constructor(private userService: UserService) {}

//   @ApiOkResponse({ description: 'Find user profile' })
//   @Get('/:username')
//   @UseGuards(new OptionalAuthGuard())
//   async findProfile(@Param('username') username: string) {
//     const user = await this.userService.findByUsername(username);
//     if (!user) {
//       throw new NotFoundException();
//     }
//     return { profile: user };
//   }

//   @ApiBearerAuth()
//   @ApiOkResponse({ description: 'Follow user' })
//   @ApiUnauthorizedResponse()
//   @Post('/:username/follow')
//   @HttpCode(200)
//   @UseGuards(AuthGuard())
//   @UseGuards(AuthGuard())
//   followUser(@User() user: UserEntity, @Param('username') username: string) {
//     return this.userService.followUser(user, username);
//   }

//   @ApiBearerAuth()
//   @ApiOkResponse({ description: 'Unfollow user' })
//   @ApiUnauthorizedResponse()
//   @Delete('/:username/follow')
//   @UseGuards(AuthGuard())
//   unfollowUser(@Param('username') username: string) {
//     return this.userService.unfollowUser(username);
//   }

//   /*<------ID Search -------> */
//   /*
//   @Get('/:id')
//   findProfile(@Param('id') id: number) {
//     return this.userService.findById(id);
//   }
//    */
// }