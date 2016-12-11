import express from 'express';
import WebhookService from '../services/webhook';

const router = express.Router();

router.get('/webhook', (req, res) => {
    WebhookService.tokenVerify(req, res);
});

router.post('/webhook', (req, res) => {
    WebhookService.messageEvent(req, res);
});

export default router;