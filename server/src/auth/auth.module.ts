import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  imports: [UsersModule,PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secretOrPrivateKey: configService.get<string>('JWT_SECRET'),
        signOptions: {
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  
})
export class AuthModule {}
