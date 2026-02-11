import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { User } from "../../entities/user.entity";
import { Hotel } from "../../hotel/entities/hotel.entity";
import { AuthModule } from "../auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Hotel]),
        AuthModule,
    ],
    controllers: [LoginController],
    providers: [LoginService],
})

export class LoginModule {}