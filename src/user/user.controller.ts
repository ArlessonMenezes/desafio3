import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guards';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

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

    @ApiTags('User')
    @ApiOperation({ summary: 'Get all users' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async findUser() {
        return this.userService.getUsers();
    };
}
