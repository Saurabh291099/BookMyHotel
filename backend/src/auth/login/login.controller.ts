import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('auth')
export class LoginController {
  @Post('login')
  async login(@Body() loginDto: any) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('All fields are required');
    }

    if (email !== 'test@hotel.com' || password !== 'test123') {
      throw new BadRequestException('Invalid Credentials');
    }

    return { message: 'Login successful' };
  }
}
