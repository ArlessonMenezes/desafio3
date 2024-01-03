import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ){}

    @UseGuards(AuthGuard('local'))
    @ApiTags('Auth')
    @ApiOperation({ summary: 'Login' })
    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);        
    };
}
