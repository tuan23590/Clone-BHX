import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage } from '@/decorator/public';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyDto } from './dto/verify-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ResponseMessage('Fetching login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  handleRegister(@Body() registerDto: CreateAuthDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('verify')
  @ResponseMessage('Fetching verify')
  handleVerify(@Body() verifyDto: VerifyDto) {
    return this.authService.verify(verifyDto);
  }
}
