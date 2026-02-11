import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Post(':hotelId')
  @UseGuards(JwtAuthGuard)
  async createDashboard(@Param('hotelId') hotelId: string) {
    return await this.dashboardService.createDashboard(hotelId);
  }

  @Get(':hotelId')
  async getDashboard(@Param('hotelId') hotelId: string) {
    return await this.dashboardService.getDashboardByHotelId(hotelId);
  }
}
