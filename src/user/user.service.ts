import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';

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

        const user = this.userRepository.create(data);
        await this.userRepository.save(user);
    }

    async login(loginDto: LoginDto) {
        const user = await this.findUserByEmail(loginDto.email);

        if (!user) {
            throw new NotFoundException('user not found in database.');
        }; 
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({
            where: { email },
        });
    }
}
