import mongoose from 'mongoose';
import { config } from '../config';
class Db {
  private static instance: Db;

  private constructor(){
    const queryString = config.queryString;
    mongoose.connect(`${queryString}${config.databaseNameDev}`).then(()=>{
      console.log('Connected to MongoDB');
    })
  }

  getInstance(): Db {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  closeConnection(): void {
    mongoose.connection.close().then(() => {
      console.log('MongoDB connection closed');
    });
  }
}

const dbInstance = Db.prototype.getInstance();
export { dbInstance };