import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1',{exclude:['']});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // xóa các trường không được khai báo trong DTO
    forbidNonWhitelisted: true, // trả về lỗi nếu có trường không được khai báo trong DTO
  }));
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
