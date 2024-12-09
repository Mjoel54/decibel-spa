import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
// import path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

//middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

//serve static files from client's dist folder
app.use(express.static('../client/dist'));
// app.use(express.static(path.join(__dirname, '../client/dist')));

//routes
app.use(routes);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('middleware error');
});

//database synchronisation and server start
sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

