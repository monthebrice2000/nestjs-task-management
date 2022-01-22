import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@models/user.entity';
import { User } from '@models/user.interface';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity> {
  async signUp(user: User): Promise<User> {
    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hashSync(user.password, salt);
    const { username, password } = user;
    const userCreate = this.create({ username, password: hashedPassword });
    try {
      return await this.save(userCreate);
    } catch (e) {
      if (e !== undefined && e !== null && e.code === '23505') {
        throw new ConflictException('User Already exists');
      } else {
        throw new InternalServerErrorException('Server Error');
      }
    }
  }

  async singIn(user: User): Promise<string> {
    const { username, password } = user;
    const userFind = await this.findOne({ username });

    if (userFind && (await bcrypt.compareSync(password, userFind.password))) {
      return 'sucess';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
