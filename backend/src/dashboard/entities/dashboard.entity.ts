import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('dashboards')
export class Dashboard {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    hotelId: string;

    @Column()
    totalBookings: number;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    totalRevenue: number;

    @Column('decimal', { precision: 5, scale: 2, default: 0 })
    occupancyRate: number;

    @Column('simple-array', { nullable: true })
    topRooms: string[];

    @Column('simple-array', { nullable: true })
    recentActivities: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
