import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '@models/task.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  username: string;
  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.user)
  tasks: TaskEntity[];
}
