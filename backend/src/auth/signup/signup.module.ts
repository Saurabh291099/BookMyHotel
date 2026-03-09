import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SignupController } from "./signup.controller";
import { SignupService } from "./signup.service";
import { User } from "../../entities/user.entity";
import { Hotel } from "../../hotel/entities/hotel.entity";
import { DashboardModule } from "../../dashboard/dashboard.module";

@Module({
    imports: [TypeOrmModule.forFeature([User, Hotel]), DashboardModule],
    controllers: [SignupController],
    providers: [SignupService],
})

export class SignupModule {}