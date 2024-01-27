import express from 'express';
import personController from '../controller/person.controller.js';

const {
    get,
    create,
    remove,
    getById,
    update
} = personController;

const router = express.Router();

router.get('/', get);
router.post('/', create);
router.delete('/:id', remove);
router.get('/:id', getById);
router.patch('/:id', update);

export default router;