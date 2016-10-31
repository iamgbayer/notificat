import express from 'express';
import AuthorizationService from '../services/authorization';

const router = express.Router();

router.get('/auth', (req, res) => {
  let authorization = new AuthorizationService();

  authorization.authorizationRedirect(req, res);
});

router.get('/callback', (req, res) => {
  let code = req.query.code;
  let options = {
    code,
  };

  AuthorizationService.getToken(options, res);
});

export default router;