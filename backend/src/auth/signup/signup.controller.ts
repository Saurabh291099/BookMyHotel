import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { SignupService } from "./signup.service";
import { SignupDto } from "./dto/signup.dto";

@Controller("auth")
export class SignupController {
    constructor(private readonly signupService: SignupService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        const { name, email, phone, password } = signupDto;

        if (!name || !email || !phone || !password) {
            throw new BadRequestException('All fields are required');
        }

        return await this.signupService.signup(signupDto);
    }
}