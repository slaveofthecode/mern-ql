import express from 'express';
import personController from '../controllers/personController.js';

const personRoute = express.Router();

personRoute.get('/', personController.get);
personRoute.post('/', personController.create);
personRoute.delete('/:id', personController.remove);
personRoute.get('/:id', personController.getById);
personRoute.patch('/:id', personController.update);

export default personRoute;