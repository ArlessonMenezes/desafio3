import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from 'src/user/model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}    

  async login(loginDto: LoginDto) {
    const payload = { sub: loginDto.id, email: loginDto.email };

    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) return null;

    const confirmedPassword = await compare(password, user.password);

    if (!confirmedPassword) return null;

    return user;
  }
}
