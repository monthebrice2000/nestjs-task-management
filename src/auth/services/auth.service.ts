import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntityRepository } from '@repositories/user.entity.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@models/user.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@models/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntityRepository)
    private readonly userEntityRepository: UserEntityRepository,
    private jwtService: JwtService,
  ) {}

  async signup(user: User): Promise<User> {
    return await this.userEntityRepository.signUp(user);
  }

  async signIn(user: User): Promise<{ token }> {
    try {
      const result = await this.userEntityRepository.singIn(user);
      if (result === 'sucess') {
        const payload: JwtPayload = { username: user.username };
        const token = await this.jwtService.signAsync(payload);
        return { token };
      }
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(e);
    }

    return;
  }
}
