import express from 'express';
import {oauth2, authorizationUriAuthRedirect} from '../services/auth';

const router = express.Router();

router.get('/auth', authorizationUriAuthRedirect);

router.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code,
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    console.log('The resulting token: ', result);
    const token = oauth2.accessToken.create(result);

    return res
      .status(200)
      .json(token);
  });
});

export default router;