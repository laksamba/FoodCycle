import express from 'express';
import {authenticate} from './../middlewares/authmiddleware.js';
import { CreateOrder, getOrderHistory } from './../controllers/orderController.js';

const router = express.Router();

router.post('/',authenticate, CreateOrder);
router.get('/history', authenticate, getOrderHistory);

export default router;
