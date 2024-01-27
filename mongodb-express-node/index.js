import dotenv from 'dotenv';
import connnectToDB from './src/db/conn.js';
import serverNode from './src/server.js';

dotenv.config();

const init = async () => {
    await connnectToDB();    
    serverNode();
};

init();