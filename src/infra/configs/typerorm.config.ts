import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Events } from 'src/modules/events/entities';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  synchronize: Boolean(process.env.DB_SYNCHROINE),
  entities: [Events],
};
