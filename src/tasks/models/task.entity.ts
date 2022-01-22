import { TaskStatus } from './task.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
