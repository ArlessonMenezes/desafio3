import { ObjectId } from "mongodb";
import { Entity, Column, ObjectIdColumn, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Event {
    @ObjectIdColumn()
    idEvent: ObjectId;

    @Column()
    idUser: ObjectId;

    @Column()
    description: string;

    @Column()
    dayOfWeek: string;
};
