import { Body, Controller, Post, Get, Patch, Param, UseGuards, BadRequestException, Req } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/hotel.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/decorators/user.decorator';

@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createHotel(@Body() hotelDto: CreateHotelDto, @GetUser() user: any) {
    return this.hotelService.createHotel(hotelDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getHotelByOwnerId(@GetUser() user: any) {
    return this.hotelService.getHotelById(user.id);
  }

  @Patch(':id')
  async updateHotel(
    @Param('id') hotelId: string,
    @Req() req: any
  ) {
    try {
      console.log('Updating hotel:', hotelId);
      console.log('Request body:', req.body);

      // Validate hotelId
      if (!hotelId) {
        throw new BadRequestException('Hotel ID is required');
      }

      // Convert hotelId to string to ensure it's in the right format
      const hotelIdStr = String(hotelId).trim();
      console.log('Hotel ID (string):', hotelIdStr);

      // Get the body - it could be regular JSON or parsed FormData
      const updateData = req.body || {};
      
      console.log('Update data after parsing:', updateData);

      // If updateData is empty or null, throw error
      if (!updateData || Object.keys(updateData).length === 0) {
        throw new BadRequestException('No update data provided');
      }

      // Filter out undefined values
      const filteredData = Object.keys(updateData).reduce((acc, key) => {
        if (updateData[key] !== undefined && updateData[key] !== null && updateData[key] !== '') {
          acc[key] = updateData[key];
        }
        return acc;
      }, {});

      console.log('Filtered data:', filteredData);

      return await this.hotelService.updateHotel(hotelIdStr, filteredData);
    } catch (error) {
      console.error('Hotel update error:', error);
      throw error;
    }
  }

  @Get(':id')
  getHotelById(@Param('id') hotelId: string) {
    return this.hotelService.getHotelByIdOnly(hotelId);
  }
}
