import mongoose from 'mongoose';
import { config } from '../config';
class Db {
  private static instance: Db;
  private connectionPromise: Promise<typeof mongoose> | null = null;
  private constructor(){
    const queryString = config.queryString;
    this.connectionPromise = mongoose.connect(`${queryString}${config.databaseNameDev}`).then(()=>{
      console.log('Connected to MongoDB');
      return mongoose;
    }).catch((err)=>{
      console.error('Error connecting to MongoDB', err);
      throw err;
    })
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