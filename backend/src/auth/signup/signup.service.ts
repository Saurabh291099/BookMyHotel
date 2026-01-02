import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class SignupService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto) {
    try {
      const { name, email, phone, password } = signupDto;

      // Check if user already exists
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const user = this.userRepository.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });

      // Save user to database
      const savedUser = await this.userRepository.save(user);

      // Return user without password
      const { password: _, ...userWithoutPassword } = savedUser;
      return {
        message: 'User created successfully',
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      // Handle database connection errors
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        throw new InternalServerErrorException('Database connection failed. Please check your database configuration.');
      }
      if (error.code === '28P01') {
        throw new InternalServerErrorException('Database authentication failed. Please check your database credentials.');
      }
      if (error.code === '3D000') {
        throw new InternalServerErrorException('Database does not exist. Please create the database first.');
      }
      throw new InternalServerErrorException('An error occurred while creating the user.');
    }
  }
}

