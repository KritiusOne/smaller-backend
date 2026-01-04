import dotenv from 'dotenv';

dotenv.config();

export const config = {
  queryString: process.env.queryString || '',
  databaseNameDev: process.env.databaseNameDev || '',
  port: parseInt(process.env.PORT || '3000', 10),
};