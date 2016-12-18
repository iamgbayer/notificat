import express from 'express';
import AuthorizationService from '../services/authorization';

const router = express.Router();

router.get('/auth', (req, res) => {
  res.redirect(AuthorizationService.authorizationUri());
});

router.get('/callback', (req, res) => {
  let code = req.query.code;
  let options = {
    code
  };

  AuthorizationService.getToken(options, res);

  return res.redirect(config.FACEBOOK_PAGE_URL);
});

export default router;