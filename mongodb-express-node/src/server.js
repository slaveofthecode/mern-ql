import express from 'express';
import personRoute from './router/person.router.js';

const server = express();

// middleware
server.use(express.json());

// router
server.use('/api/person', personRoute);

const main = () => {
    
    const port = process.env.SERVER_PORT || 3001;

    server.listen(port, () => {
        console.log('Node Express is running on port ' + port);
    });
};

export default main;