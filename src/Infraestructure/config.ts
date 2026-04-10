import dotenv from 'dotenv';

dotenv.config({
  path: '.env.production.test'
});

const parseFirebaseAdminConfigRaw = (raw: string | undefined) => {
  if (!raw) {
    return null;
  }

  const candidates = [
    raw,
    raw.replace(/\\"/g, '"'),
    raw
      .replace(/\\\r?\n/g, '\\n')
      .replace(/\r?\n/g, '\\n')
      .replace(/\\"/g, '"'),
    raw
      .replace(/^['"]|['"]$/g, '')
      .replace(/\\\r?\n/g, '\\n')
      .replace(/\r?\n/g, '\\n')
      .replace(/\\"/g, '"')
  ];

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      // Try the next normalization candidate.
    }
  }

  throw new Error('FIREBASE_ADMIN_CONFIG_RAW is not valid JSON');
};

const {
  queryString,
  MONGO_URL,
  databaseNameDev,
  DATABASE_NAME,
  PORT,
  port,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_ADMIN_NAME,
  FIREBASE_ADMIN_CONFIG_RAW
} = process.env;
export const config = {
  queryString: MONGO_URL || queryString || '',
  databaseNameDev: DATABASE_NAME || databaseNameDev || '',
  port: parseInt(PORT || port || '3000', 10),
  firebase: {
    projectId: FIREBASE_PROJECT_ID || '',
    privateKey: FIREBASE_PRIVATE_KEY
      ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : '',
    clientEmail: FIREBASE_CLIENT_EMAIL || '', 
    firebaseAdminConfigName: FIREBASE_ADMIN_NAME || 'smaller-backend',
    firebaseAdminConfigRaw: parseFirebaseAdminConfigRaw(FIREBASE_ADMIN_CONFIG_RAW)
  }
};

