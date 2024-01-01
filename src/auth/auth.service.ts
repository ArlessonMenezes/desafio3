import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}    

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);

    if (!user) {
        throw new NotFoundException('user not found.');
    };

    const confirmedPassword = await compare(loginDto.password, user.password);

    if (!confirmedPassword) {
        throw new UnauthorizedException('email or password invalid.');
    };

    const payload = { email: user.email, sub: user.id };

    const token = sign({ payload }, 'secretpasswordapplication' ?? '');

    const { password, confirmPassword, ...returnUser } = user;

    return { returnUser, token };
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  };
}
