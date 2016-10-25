import express from 'express';
import AuthRoute from './auth';
import WebhookRoute from './webhook';

const router = express.Router();

router.use('/', AuthRoute);
// router.use('/calback', AuthRoute);

export default router;