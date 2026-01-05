import express from 'express';
import { server } from './src/server';
import bodyParser from "body-parser";
import { URLRouter } from '@src/Presentation/url/URLRouter';
import { UserRouter } from '@src/Presentation/user/UserRouter';
import { dbInstance } from '@src/Infraestructure/db/Db';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(URLRouter);
app.use(UserRouter);
dbInstance.waitForConnection()
.then(() => {
  server(app);
})
.catch((err)=> {
  console.error('Failed to connect to the database:', err);
})