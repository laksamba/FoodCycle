import express from 'express';
import { authenticate } from './../middlewares/authmiddleware.js';

import { initiateEsewaPayment,initiateKhaltiPayment,handleEsewaSuccess, handleKhaltiSuccess } from './../controllers/paymentController.js';

const router = express.Router();

router.post('/esewa/initiate', authenticate, initiateEsewaPayment);
router.post('/khalti/initiate', authenticate, initiateKhaltiPayment);

router.get('/esewa/success',handleEsewaSuccess);
router.get('/khalti/success',handleKhaltiSuccess);

export default router;