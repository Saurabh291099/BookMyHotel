import { Body, Controller, Req, Post, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/hotel.dto';

@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Post()
  createHotel(@Body() hotelDto: CreateHotelDto, @Req() req: any) {
    return this.hotelService.createHotel(hotelDto, req.user.id);
  }

  @Get()
  getHotelByOwnerId(@Req() req: any) {
    return this.hotelService.getHotelById(req.user.id);
  }
}
