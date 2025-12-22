import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { User } from "../../entities/user.entity";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'defaultSecretKey',
        signOptions: { expiresIn: '1d' },
    })
],
    controllers: [LoginController],
    providers: [LoginService],
})

export class LoginModule {}