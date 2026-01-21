import admin from 'firebase-admin';
import { config } from '../config';

export function initializeAuth() {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.fireabse.projectId,
      privateKey: config.fireabse.privateKey,
      clientEmail: config.fireabse.clientEmail,
    })
  })
  return admin.auth();
}