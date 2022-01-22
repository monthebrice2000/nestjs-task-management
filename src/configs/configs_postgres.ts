import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import { UserEntity } from '@models/user.entity';
import { TaskEntity } from '@models/task.entity';
import { ConfigService } from '@nestjs/config';
import { TlsOptions } from 'tls';

export const configs_postgres = (
  configService: ConfigService,
): ConnectionOptions => {
  return {
    /**
     * Object with ssl parameters

    ssl: configService.get('MODE') === 'prod',*/
    /**
     * Database type.
     */
    type: 'postgres',
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
     * Database host.
     */
    host: process.env.hostname,
    /**
     * Database host port.
     */
    port: parseInt(process.env.port),
    /**
     * Database username.
     */
    username: process.env.user,
    /**
     * Database password.
     */
    password: process.env.password,
    /**
     * Database name to connect to.
     */
    database: process.env.database_postgres,
    /**
     * A boolean determining whether to pass time values in UTC or local time. (default: true).
     */
    useUTC: true,
    /**
     * The Postgres extension to use to generate UUID columns. Defaults to uuid-ossp.
     * If pgcrypto is selected, TypeORM will use the gen_random_uuid() function from this extension.
     * If uuid-ossp is selected, TypeORM will use the uuid_generate_v4() function from this extension.
     */
    uuidExtension: 'pgcrypto',
    /**
     * Include notification messages from Postgres server in client logs
     */
    logNotifications: true,
  };
};

//export = configs_postgres
