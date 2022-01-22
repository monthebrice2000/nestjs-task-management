import { TaskStatus } from './task.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '@models/user.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('Task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.tasks, {
    eager: true,
  })
  @Exclude()
  user: UserEntity;
}
