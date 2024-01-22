import dotenv from 'dotenv';
import express from 'express';
import connnectToDB from './src/db/index.js';
import personRoute from './src/routes/personRoute.js';

dotenv.config();

const server = express();

server.use(express.json());

server.use('/api/person', personRoute);

const port = process.env.SERVER_PORT || 3000;

server.listen(port, async () => {
    console.log('Node Express is running on port ' + port);
    await connnectToDB();
});