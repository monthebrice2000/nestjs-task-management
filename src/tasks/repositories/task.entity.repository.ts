import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from '@models/task.entity';

@EntityRepository(TaskEntity)
export class TaskEntityRepository extends Repository<TaskEntity> {}
