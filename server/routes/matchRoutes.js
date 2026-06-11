import express from 'express';
import { getMatches, sendMatch } from '../controllers/matchController.js';

const router = express.Router();

router.get('/:customerId', getMatches);
router.post('/send', sendMatch);

export default router;
