import { Sequelize } from 'sequelize';

// Global cache for Next.js hot-reloading
declare global {
  var __sequelizeInstance: Sequelize | undefined;
}

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_NAME = process.env.DB_NAME || 'freebies';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_DIALECT = (process.env.DB_DIALECT as 'mysql' | 'sqlite') || (process.env.DB_HOST ? 'mysql' : 'sqlite');

function createSequelizeInstance(): Sequelize {
  if (DB_DIALECT === 'mysql') {
    return new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: 'mysql',
      logging: false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      dialectOptions: {
        connectTimeout: 5000,
      },
    });
  }

  // SQLite fallback for standalone development / seamless building
  return new Sequelize({
    dialect: 'sqlite',
    storage: './freebies_dev.sqlite',
    logging: false,
  });
}

export const sequelize = global.__sequelizeInstance || createSequelizeInstance();

if (process.env.NODE_ENV !== 'production') {
  global.__sequelizeInstance = sequelize;
}

export async function testDbConnection(): Promise<{ connected: boolean; dialect: string; error?: string }> {
  try {
    await sequelize.authenticate();
    return { connected: true, dialect: sequelize.getDialect() };
  } catch (err: any) {
    console.warn(`Sequelize connection to ${DB_DIALECT} failed: ${err.message}.`);
    return { connected: false, dialect: sequelize.getDialect(), error: err.message };
  }
}
