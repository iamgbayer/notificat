import simpleOauth from 'simple-oauth2';
import config from '../../index';
import express from 'express';

class AuthorizationService {
  static createAuthorization () {
    let createAuthorizationValue = simpleOauth.create({
      client: {
        id: config.CLIENT_ID,
        secret: config.CLIENT_SECRET,
      },
      auth: {
        tokenHost: config.TOKEN_HOST,
        tokenPath: config.TOKEN_PATH,
        authorizePath: config.AUTHORIZE_PATH
      }
    });

    return createAuthorizationValue;
  }

  authorizationRedirect (res) {
    return res.redirect(this.authorizationUri());
  }

  authorizationUri () {
    let authorizationUriValue = AuthorizationService.createAuthorization().authorizationCode.authorizeURL({
      redirect_uri: config.REDIRECT_URI,
      scope: config.REDIRECT_SCOPE,
      state: config.REDIRECT_STATE,
    });

    return authorizationUriValue;
  }

  static getToken (options, res) {
    AuthorizationService.createAuthorization().authorizationCode.getToken(options, (error, result) => {
      if (error) {
        console.error('Access Token Error', error.message);
        return res.json('Authentication failed');
      }

      GITHUB_TOKEN = AuthorizationService.createAuthorization().accessToken.create(result);

      return res.redirect(config.FACEBOOK_PAGE_URL);
    });
  }
}

export default AuthorizationService;