import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  username: string;
  @Column()
  password: string;
}
