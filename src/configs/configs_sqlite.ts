import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { UserEntity } from '@models/user.entity';
import { TaskEntity } from '@models/task.entity';

dotenv.config();

export const configs_sqlite: ConnectionOptions = {
  /**
   * Database type.
   */
  type: 'sqlite',
  /**
   * Entities to be loaded for this connection.
   * Accepts both entity classes and directories where from entities need to be loaded.
   * Directories support glob patterns.
   */
  entities: [UserEntity, TaskEntity],
  /**
   * Migrations to be loaded for this connection.
   * Accepts both migration classes and directories where from migrations need to be loaded.
   * Directories support glob patterns.
   */
  migrations: [__dirname + '/**/*/*{.ts,.js}'],

  /**
   * Logging options.
   */
  logging: 'all',
  /**
   * Indicates if database schema should be auto created on every application launch.
   * Be careful with this option and don't use this in production - otherwise you can lose production data.
   * This option is useful during debug and development.
   * Alternative to it, you can use CLI and run schema:sync command.
   *
   * Note that for MongoDB database it does not create schema, because MongoDB is schemaless.
   * Instead, it syncs just by creating indices.
   */
  synchronize: true,
  cli: {
    /**
     * Directory where migrations should be created by default.
     */
    migrationsDir: 'src/migrations',
  },
  /**
   * Database name to connect to.
   */
  database: process.env.database_sqlite,
};

//export = configs_postgres
