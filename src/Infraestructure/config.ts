import dotenv from 'dotenv';

dotenv.config();

export const config = {
  queryString: process.env.queryString || '',
  databaseNameDev: process.env.databaseNameDev || '',
  port: parseInt(process.env.PORT || '3000', 10),
  fireabse: {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '', 
  }
};