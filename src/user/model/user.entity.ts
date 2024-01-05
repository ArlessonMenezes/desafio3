import { ObjectId } from "mongodb";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ObjectIdColumn } from "typeorm";

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
}