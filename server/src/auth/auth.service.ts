import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePassword } from '@/utils/handlePassword';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(userName: string, password: string, phone: string) {
    const user = await this.usersService.findByEmailOrPhone(userName, phone);
    if (!user) return null;
    if(comparePassword(password, user.password)) return user;
  }
}
