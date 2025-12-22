import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { CreateHotelDto } from './dto/hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
  ) {}

  createHotel(hotelDto: CreateHotelDto, ownerId: number): Promise<Hotel> {
    const hotel = this.hotelRepository.create({ ...hotelDto, ownerId });
    return this.hotelRepository.save(hotel);
  }

  async getHotelById(ownerId: number) {
    return this.hotelRepository.find({ where: { ownerId } });
  }
}
