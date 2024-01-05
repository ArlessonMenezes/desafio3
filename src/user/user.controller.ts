import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @ApiTags('User')
    @ApiOperation({ summary: 'Create a new user' })
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    };


}
