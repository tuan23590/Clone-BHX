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

  async validateUser(userName: string, password: string) {
    const user = await this.usersService.findByEmailOrPhone(userName);
    if (!(await comparePassword(password, user?.password))) return null;
    if (!user) return null;
    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
