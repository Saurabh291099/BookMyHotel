import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { HomepageModule } from './cms/homepage/homepage.module';
import { AboutModule } from './cms/about/about.module';
import { AmenitiesModule } from './cms/amenities/amenities.module';
import { RoomsModule } from './cms/rooms/rooms.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [HomepageModule, AboutModule, AmenitiesModule, RoomsModule]
})
export class DashboardModule {}
