import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  createHotel(hotelDto: CreateHotelDto, ownerId: string): Promise<Hotel> {
    const hotel = this.hotelRepository.create({ ...hotelDto, ownerId });
    return this.hotelRepository.save(hotel);
  }

  async getHotelById(ownerId: string) {
    return this.hotelRepository.find({ where: { ownerId } });
  }

  async getHotelByIdOnly(hotelId: string) {
    const hotel = await this.hotelRepository.findOne({ where: { id: hotelId } });
    if (!hotel) {
      throw new BadRequestException('Hotel not found');
    }
    return hotel;
  }

  async updateHotel(hotelId: string, updateData: Partial<CreateHotelDto>) {
    try {
      console.log('Service updating hotel:', hotelId);
      console.log('Update data:', updateData);

      // Check if hotel exists
      const hotel = await this.hotelRepository.findOne({ where: { id: hotelId } });
      
      console.log('Found hotel:', hotel);

      if (!hotel) {
        throw new BadRequestException('Hotel not found');
      }

      // Update the hotel
      const updateResult = await this.hotelRepository.update(hotelId, updateData);
      console.log('Update result:', updateResult);
      
      // Return updated hotel
      const updatedHotel = await this.hotelRepository.findOne({ where: { id: hotelId } });
      console.log('Updated hotel:', updatedHotel);
      
      return updatedHotel;
    } catch (error) {
      console.error('Update hotel error details:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      // Log the specific error for UUID parsing
      if (error.message && error.message.includes('invalid input syntax for type uuid')) {
        throw new BadRequestException('Invalid Hotel ID format');
      }
      throw new InternalServerErrorException('Failed to update hotel: ' + error.message);
    }
  }
}

// DROP TABLE IF EXISTS hotels CASCADE;
