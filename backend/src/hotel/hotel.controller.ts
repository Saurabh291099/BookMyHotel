import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/hotel.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/decorators/user.decorator';

@Controller('hotels')
@UseGuards(JwtAuthGuard)
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Post()
  createHotel(@Body() hotelDto: CreateHotelDto, @GetUser() user: any) {
    return this.hotelService.createHotel(hotelDto, user.id);
  }

  @Get()
  getHotelByOwnerId(@GetUser() user: any) {
    return this.hotelService.getHotelById(user.id);
  }
}
