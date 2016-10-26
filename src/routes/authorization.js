import express from 'express';
import AuthorizationService from '../services/authorization';

const router = express.Router();

router.get('/auth', (req, res) => {
  let authorization = new AuthorizationService();

  authorization.authorizationRedirect(req, res);
});

router.get('/callback', (req, res) => {
  let authorization = new AuthorizationService.createAuthorization();
  
  let code = req.query.code;
  let options = {
    code,
  };

  authorization.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    let token = authorization.accessToken.create(result);
    let finalToken = `${token.token_type} ${token.access_token}`;

    console.log(finalToken);

    return res
      .status(200)
      .json(token);
  });
});

export default router;