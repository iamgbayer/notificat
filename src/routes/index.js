import express from 'express';
import AuthorizationRoute from './authorization';
import WebhookRoute from './webhook';

const router = express.Router();

router.use('/', AuthorizationRoute);
router.use('/', WebhookRoute);

export default router;