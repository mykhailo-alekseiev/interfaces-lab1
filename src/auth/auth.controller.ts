import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schemas/user.schema';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiResponse({
    status: 201,
    description: 'Successful authorization',
  })
  signUp(
    @Body()
    user: SignUpDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signUp(user);
  }

  @Post('/login')
  @ApiResponse({
    status: 200,
    description: 'User was created',
  })
  login(
    @Body()
    loginDto: LoginDto,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/user')
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: 200,
    description: 'Successful getting user info',
  })
  getUser(
    @Req()
    req,
  ): Promise<User> {
    return req.user;
  }
}
