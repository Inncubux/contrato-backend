export const databaseConfig = {
  dialect: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'simtexx_user',
  password: process.env.DB_PASSWORD || 'simtexx_pass',
  database: process.env.DB_DATABASE || 'simtexx_db',
  autoLoadModels: true,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
};
