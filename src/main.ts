import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, DuplicateExceptionFilter } from 'src/common/exception/index';
import { LoggingInterceptor } from 'src/common/interceptors/index'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(
  //   new AllExceptionsFilter(),
  //   new DuplicateExceptionFilter()
  // );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
