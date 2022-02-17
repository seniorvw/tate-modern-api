import { Router } from 'express';
const artRouter = require('./art');
const userRouter = require('./user');

const router = Router();

router.use('/art', artRouter);
router.use('/users', userRouter);

module.exports = router;
