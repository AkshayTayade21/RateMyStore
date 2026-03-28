import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectToDatabase from './src/config/db.js';
import authRouter from './src/features/auth/auth.routes.js';
import ownerRouter from './src/features/owner/owner.routes.js';
import storeRouter from './src/features/stores/stores.routes.js';
import ratingsRouter from './src/features/ratings/ratings.routes.js';
import adminRouter from './src/features/admin/admin.routes.js';


const server = express();
server.use(cors());
server.use(express.json());


server.use('/api/auth',authRouter);
server.use('/api/stores',storeRouter);
server.use('/api/ratings',ratingsRouter);
server.use('/api/admin',adminRouter);
server.use('/api/owner',ownerRouter);

const startServer = async () => {
  await connectToDatabase();

  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer();