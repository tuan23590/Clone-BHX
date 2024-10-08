import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage } from '@/decorator/public';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ForgotPasswordDto, ResendCodeDto, VerifyDto } from './dto/verify-auth.dto';

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

  @Public()
  @Post('resend-code')
  @ResponseMessage('Fetching resend code')
  handleResendCode(@Body() resendCodeDto: ResendCodeDto) {
    return this.authService.resendCode(resendCodeDto);
  }

  @Public()
  @Post('forgot-password')
  @ResponseMessage('Fetching resend code')
  handleForgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
}
