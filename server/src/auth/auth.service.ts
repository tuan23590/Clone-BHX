import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/utils/handlePassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, password: string) {
    const user = await this.usersService.findByEmailOrPhone(userName);
    if (! await comparePassword(password, user?.password)) { throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng'); }
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
