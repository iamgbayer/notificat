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

const oauth2 = simpleOauth.create({
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

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: REDIRECT_URI,
  scope: REDIRECT_SCOPE,
  state: REDIRECT_STATE,
});

  // function createAuth () {
  //   return simpleOauth.create({
      // client: {
      //   id: CLIENT_ID,
      //   secret: CLIENT_SECRET,
      // },
      // auth: {
      //   tokenHost: TOKEN_HOST,
      //   tokenPath: TOKEN_PATH,
      //   authorizePath: AUTHORIZE_PATH
      // }
  //   });
  // }

  function authorizationUriAuthRedirect (req, res) {
    res.redirect(authorizationUri);
  }

  // function authorizationUriAuth () {
  //   let authorizationUri = createAuth.authorizationCode.authorizeURL({
  //     redirect_uri: REDIRECT_URI,
  //     scope: REDIRECT_SCOPE,
  //     state: REDIRECT_STATE,
  //   })

  //   return authorizationUri;
  // }

export default {authorizationUri, oauth2, authorizationUriAuthRedirect};