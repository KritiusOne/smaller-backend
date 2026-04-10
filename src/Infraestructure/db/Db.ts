import mongoose from 'mongoose';
import { config } from '../config';
class Db {
  private static instance: Db;
  private connectionPromise: Promise<typeof mongoose> | null = null;
  private constructor(){
    const mongoUrl = this.buildMongoUrl();
    this.connectionPromise = mongoose.connect(mongoUrl).then(()=>{
      console.log('Connected to MongoDB');
      return mongoose;
    }).catch((err)=>{
      console.error('Error connecting to MongoDB', err);
      throw err;
    })
  }

  private buildMongoUrl(): string {
    const baseUrl = config.queryString;
    const databaseName = config.databaseNameDev;

    if (!baseUrl) {
      throw new Error('MongoDB connection string is missing');
    }

    if (!databaseName) {
      return baseUrl;
    }

    try {
      const url = new URL(baseUrl);
      url.pathname = `/${databaseName}`;
      if (!url.searchParams.has('authSource')) {
        url.searchParams.set('authSource', 'admin');
      }
      return url.toString();
    } catch {
      const separator = baseUrl.endsWith('/') ? '' : '/';
      const connectionUrl = `${baseUrl}${separator}${databaseName}`;

      return connectionUrl.includes('?')
        ? connectionUrl
        : `${connectionUrl}?authSource=admin`;
    }
  }

  getInstance(): Db {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }
  async waitForConnection(): Promise<void> {
    if (this.connectionPromise) {
      await this.connectionPromise;
    }
  }

  closeConnection(): void {
    mongoose.connection.close().then(() => {
      console.log('MongoDB connection closed');
    });
  }
}

const dbInstance = Db.prototype.getInstance();
export { dbInstance };