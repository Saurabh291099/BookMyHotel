import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './entities/dashboard.entity';
import { HomepageModule } from './cms/homepage/homepage.module';
import { AboutModule } from './cms/about/about.module';
import { AmenitiesModule } from './cms/amenities/amenities.module';
import { RoomsModule } from './cms/rooms/rooms.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [
    TypeOrmModule.forFeature([Dashboard]),
    HomepageModule,
    AboutModule,
    AmenitiesModule,
    RoomsModule,
  ],
  exports: [DashboardService],
})
export class DashboardModule {}
