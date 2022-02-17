import { Router } from 'express';
import * as UserController from '../controllers/UserController';
const router = Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);

module.exports = router;
