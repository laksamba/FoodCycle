import express from 'express';
import {authenticate, authorize} from './../middlewares/authmiddleware.js';

import { CreateFoodListing,getNearbyFood } from './../controllers/foodController.js';

const router = express.Router();

router.post('/', authenticate, authorize('business'), CreateFoodListing);
router.get('/nearby', authenticate, getNearbyFood);

export default router;