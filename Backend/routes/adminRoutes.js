import express from 'express';
import { authenticate,authorize } from './../middlewares/authmiddleware.js';
import { approveBusiness, getPlatformStats } from './../controllers/adminController.js';

const router = express.Router();

router.put("/business/:userId/approve", authenticate, authorize("admin"), approveBusiness);
router.get("/stats", authenticate, authorize("admin"), getPlatformStats);

export default router;