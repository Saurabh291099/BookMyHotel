import {Controller, Post, Body, BadRequestException} from "@nestjs/common";


@Controller("auth")

export class SignupController {
    @Post('signup')
    async signup(@Body() signupDto: any){
        const {name, email, phone, password } = signupDto;

        if(!name || !email || !phone || !password) {
            throw new BadRequestException('All Fields are required');
        }

        if (email === 'test@hotel.com'){
            throw new BadRequestException('Email already exists');
        }

        return{ message: "User Created successfully"};
    }
}