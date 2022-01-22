import { Module } from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { AuthController } from '@controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityRepository } from '@repositories/user.entity.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@services/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([UserEntityRepository]),
    JwtModule.register({
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '1d',
      },
      secret: 'tontonlaforce',
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
