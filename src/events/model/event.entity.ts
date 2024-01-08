import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    idEvent: number;

    @Column()
    idUser: number;

    @Column()
    description: string;

    @Column()
    dayOfWeek: string;
};
