import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('hotels')


export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ownerId: number;

    @Column()
    name: string;
    
    @Column()
    address: string;

    @Column()
    city: string;
    
    @Column()
    country: string;

    @Column()
    description: string;

    @Column()
    rating: number;

    @Column()
    imageUrl: string;

}