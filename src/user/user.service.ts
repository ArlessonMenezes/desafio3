import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId, Repository } from 'typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async createUser(data: CreateUserDto) {
        const userExists = await this.findUserByEmail(data.email);
        
        if (userExists) {
            throw new BadRequestException('user already exists in database.');
        };

        if (data.password !== data.confirmedPassword) {
            throw new BadRequestException('passwords must be identical');
        };

        const salt = 10;
        const hasPassword = await hash(data.password, salt); 

        const user = this.userRepository.create({
            ...data,
            password: hasPassword,
        });

        await this.userRepository.save(user);
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email },
        });
    };

    async findUserById(idUser: number) {
        return this.userRepository.findOne({
            where: { idUser },
        });
    };

    async getUsers() {
        return this.userRepository.find({
            select: [
                'idUser',
                'firstName',
                'lastName',
                'email',
                'city',
                'country',
                'birthDate',
            ],
        });
    }
}

