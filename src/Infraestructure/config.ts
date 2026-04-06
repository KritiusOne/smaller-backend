import dotenv from 'dotenv';

dotenv.config();

const {
  queryString,
  databaseNameDev,
  PORT,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_ADMIN_NAME,
  FIREBASE_ADMIN_CONFIG_RAW
} = process.env;
export const config = {
  queryString: queryString || '',
  databaseNameDev: databaseNameDev || '',
  port: parseInt(PORT || '3000', 10),
  firebase: {
    projectId: FIREBASE_PROJECT_ID || '',
    privateKey: FIREBASE_PRIVATE_KEY
      ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : '',
    clientEmail: FIREBASE_CLIENT_EMAIL || '', 
    firebaseAdminConfigName: FIREBASE_ADMIN_NAME || 'smaller-backend',
    firebaseAdminConfigRaw: FIREBASE_ADMIN_CONFIG_RAW ? JSON.parse(FIREBASE_ADMIN_CONFIG_RAW) : null
  }
};

