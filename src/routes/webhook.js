import express from 'express';
import WebhookService from '../services/webhook';

const router = express.Router();

router.get('/', WebhookService.oi);

export default router;