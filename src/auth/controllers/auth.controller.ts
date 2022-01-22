import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { UserDto } from '@models/user.dto';
import { User } from '@models/user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() userDto: UserDto): Promise<User> {
    return await this.authService.signup(userDto);
  }

  @Get('signIn')
  async signIn(@Body() userDto: UserDto): Promise<{ token }> {
    return this.authService.signIn(userDto);
  }

  @UseGuards(AuthGuard())
  @Post('test')
  test(@Req() req) {
    console.log(req);
  }
}
