import { Event } from "src/events/model/event.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Event, event => event.idUser)
    events: Event[];
}