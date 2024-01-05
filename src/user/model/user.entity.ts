import { Event } from "src/events/model/event.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    idUser: ObjectId;

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
    
    @Column()
    confirmPassword: string;

    // @OneToMany(() => Event, event => event.user)
    // events: Event[];
}