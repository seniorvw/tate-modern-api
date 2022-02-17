import { Router } from 'express';
import * as ArtController from '../controllers/ArtController';

const router = Router();

router.get('/', ArtController.getAllArts);
router.get('/:id', ArtController.getArtById);
router.post('/:id/comments', ArtController.createComment);

module.exports = router;
