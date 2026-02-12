import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';

export const sequelize = new Sequelize({
  database: databaseConfig.database,
  username: databaseConfig.username,
  password: databaseConfig.password,
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: databaseConfig.dialect,
  logging: databaseConfig.logging,
  models: [__dirname + '/../modules/**/*.entity.{ts,js}'],
});
