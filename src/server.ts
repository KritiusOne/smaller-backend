import { Application } from 'express';
import { config } from './Infraestructure/config';

export const server = (app: Application) => {
  const PORT = config.port;
  app.get('/', (req, res)=> {
    res.send(`
      <h1>Welcome to the Smaller Backend Server</h1>
      <p> running on port ${PORT} </p>
    `)
  })
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}