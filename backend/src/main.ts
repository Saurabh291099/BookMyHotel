import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:"http://localhost:3000", //Frontend URL
    Credential:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    exposedHeaders:["Content-Range","X-Total-Count"],
  })
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
