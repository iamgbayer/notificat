import express from 'express';
import WebhookService from '../services/webhook';

const router = express.Router();

router.get('/webhook', (req, res) => {
    WebhookService.messageEvent(req, res)
    // res.send('oi')
});

export default router;