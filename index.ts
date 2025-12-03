import express from 'express';
import { server } from './src/server';

const app = express();

server(app);