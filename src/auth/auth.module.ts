import { Module } from '@nestjs/common';
import { AuthService } from '@services/auth.service';
import { AuthController } from '@controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@services/jwt.strategy';
import { UserEntity } from '@models/user.entity';
import { UserEntityRepository } from '@repositories/user.entity.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([UserEntityRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          signOptions: {
            algorithm: 'HS256',
            expiresIn: '1d',
          },
          secret: configService.get('secret'),
        };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
