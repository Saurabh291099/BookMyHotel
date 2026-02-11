import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dashboard } from './entities/dashboard.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardRepository: Repository<Dashboard>,
  ) {}

  async createDashboard(hotelId: string) {
    try {
      const dashboard = this.dashboardRepository.create({
        hotelId,
        totalBookings: 0,
        totalRevenue: 0,
        occupancyRate: 0,
        topRooms: [],
        recentActivities: [],
      });

      return await this.dashboardRepository.save(dashboard);
    } catch (error) {
      console.error('Dashboard creation error:', error);
      throw error;
    }
  }

  async getDashboardByHotelId(hotelId: string) {
    const dashboard = await this.dashboardRepository.findOne({
      where: { hotelId },
    });

    if (!dashboard) {
      throw new BadRequestException('Dashboard not found for this hotel');
    }

    return dashboard;
  }

  async updateDashboard(hotelId: string, updateData: Partial<Dashboard>) {
    const dashboard = await this.getDashboardByHotelId(hotelId);

    await this.dashboardRepository.update(dashboard.id, updateData);

    return await this.dashboardRepository.findOne({
      where: { id: dashboard.id },
    });
  }
}
