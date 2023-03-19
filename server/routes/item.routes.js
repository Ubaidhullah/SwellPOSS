import express from 'express';

import { createItem, getAllItems, getItemDetail, deleteItem, updateItem } from '../controllers/item.controller.js';

const router = express.Router();

router.route('/').get(getAllItems);
router.route('/').post(createItem);
router.route('/:id').get(getItemDetail);
router.route('/:id').delete(deleteItem);
router.route('/:id').patch(updateItem);

export default router;
