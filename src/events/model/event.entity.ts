import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Event {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    description: string;

    @Column()
    date: string;
}