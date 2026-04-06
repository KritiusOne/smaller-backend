import admin from 'firebase-admin';
import { config } from '../config';

export function initializeAuth() {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      privateKey: config.firebase.privateKey,
      clientEmail: config.firebase.clientEmail,
    })
  })
  return admin.auth();
}