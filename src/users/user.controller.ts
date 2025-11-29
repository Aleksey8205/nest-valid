import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './validate/dtos/create-user.dto';
import { SigninUserDto } from './validate/dtos/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(
    @Body()
    userData: CreateUserDto,
  ) {
    return this.usersService.signup(userData);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() credentials: SigninUserDto) {
    return this.usersService.signin(credentials.email, credentials.password);
  }
}
