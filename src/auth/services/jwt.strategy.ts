import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntityRepository } from '@repositories/user.entity.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '@models/jwt.payload';
import { User } from '@models/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntityRepository)
    private readonly userEntityRepository: UserEntityRepository,
  ) {
    super({
      secretOrKey: 'tontonlaforce',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userEntityRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
