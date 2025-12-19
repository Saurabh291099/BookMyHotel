import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { User } from "../../entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [LoginController],
    providers: [LoginService],
})

export class LoginModule {}