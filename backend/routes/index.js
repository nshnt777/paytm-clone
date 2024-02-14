import express from 'express'
import userRouter from './user.js'
import accountsRouter from './account.js';

const router = express.Router();

router.use('/user', userRouter);
// any call to /api/v1/user/..... will be forwarded to the user router

router.use('/account', accountsRouter);

export default router;