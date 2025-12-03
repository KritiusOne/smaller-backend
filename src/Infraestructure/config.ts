import dotenv from 'dotenv';

dotenv.config();

export const config = {
  queryString: process.env.queryString || '',
  databaseNameDev: process.env.databaseNameDev || '',
  port: process.env.port || '3000',
};