import simpleOauth from 'simple-oauth2';
import express from 'express';

const CLIENT_ID = 'd00c47596542405a4e5e';
const CLIENT_SECRET= '99be506fff2dc69676c894ec37635d344e40088c';

const TOKEN_HOST = 'https://github.com';
const TOKEN_PATH = '/login/oauth/access_token';
const AUTHORIZE_PATH = '/login/oauth/authorize';

const REDIRECT_URI = 'http://localhost:5000/api/callback';
const REDIRECT_SCOPE = 'notifications';
const REDIRECT_STATE = '3(#0/!~';

class AuthorizationService {
  static createAuthorization () {
    let createAuthorizationValue = simpleOauth.create({
      client: {
        id: CLIENT_ID,
        secret: CLIENT_SECRET,
      },
      auth: {
        tokenHost: TOKEN_HOST,
        tokenPath: TOKEN_PATH,
        authorizePath: AUTHORIZE_PATH
      }
    });

    return createAuthorizationValue;
  }

  authorizationRedirect (req, res) {
    return res.redirect(this.authorizationUri());
  }

  authorizationUri () {
    let authorizationUriValue = AuthorizationService.createAuthorization().authorizationCode.authorizeURL({
      redirect_uri: REDIRECT_URI,
      scope: REDIRECT_SCOPE,
      state: REDIRECT_STATE,
    });

    return authorizationUriValue;
  }
}

export default AuthorizationService;