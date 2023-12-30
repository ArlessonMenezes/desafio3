import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectId;

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
}