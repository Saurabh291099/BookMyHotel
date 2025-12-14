import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SignupModule} from './auth/signup/signup.module';
import {LoginModule} from './auth/login/login.module';
import { SignupController } from './auth/signup/signup.controller';
import { LoginController } from './auth/login/login.controller';
@Module({
  imports: [SignupModule, LoginModule],
  controllers: [AppController, SignupController, LoginController],
  providers: [AppService],
})
export class AppModule {}
