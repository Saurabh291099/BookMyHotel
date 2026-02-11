import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hotels')
export class Hotel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ownerId: string;

    @Column()
    name: string;
    
    @Column()
    address: string;

    @Column()
    city: string;
    
    @Column()
    country: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    rating: string;

    @Column({ nullable: true })
    imageUrl: string;
}