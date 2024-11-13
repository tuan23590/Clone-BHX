import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/utils/handlePassword';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ForgotPasswordDto, ResendCodeDto, VerifyDto } from './dto/verify-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string) {
    const user = await this.usersService.findByEmail(userName);
    if (!user) return null;
    if (!(await comparePassword(password, user?.password))) return null;
    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user:{
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: CreateAuthDto) {
    return await this.usersService.register(registerDto);
  }

  async verify(verifyDto: VerifyDto) {
    return await this.usersService.verify(verifyDto);
  }

  async resendCode(resendCodeDto: ResendCodeDto) {
    return await this.usersService.resendCode(resendCodeDto);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return await this.usersService.forgotPassword(forgotPasswordDto);
  }
}
