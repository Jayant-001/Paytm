import express from 'express'
import authRoute from './auth.js'
import userRoute from './user.js'
import accountRoute from './account.js'
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();


router.use('/auth', authRoute);
router.use('/user', authMiddleware, userRoute);
router.use('/account', authMiddleware, accountRoute)

export default router;