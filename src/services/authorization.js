'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleOauth = require('simple-oauth2');

var _simpleOauth2 = _interopRequireDefault(_simpleOauth);

var _config = require('../configs/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizationService = function () {
  function AuthorizationService() {
    _classCallCheck(this, AuthorizationService);
  }

  _createClass(AuthorizationService, null, [{
    key: 'createAuthorization',
    value: function createAuthorization() {
      var createAuthorizationValue = _simpleOauth2.default.create({
        client: {
          "id": _config2.default.CLIENT_ID,
          "secret": _config2.default.CLIENT_SECRET
        },
        auth: {
          "tokenHost": _config2.default.TOKEN_HOST,
          "tokenPath": _config2.default.TOKEN_PATH,
          "authorizePath": _config2.default.AUTHORIZE_PATH
        }
      });

      return createAuthorizationValue;
    }
  }, {
    key: 'authorizationUri',
    value: function authorizationUri() {
      var authorizationUriValue = AuthorizationService.createAuthorization().authorizationCode.authorizeURL({
        "redirect_uri": _config2.default.REDIRECT_URI,
        "scope": _config2.default.REDIRECT_SCOPE,
        "state": _config2.default.REDIRECT_STATE
      });

      return authorizationUriValue;
    }
  }, {
    key: 'getToken',
    value: function getToken(options, res) {
      var _this = this;

      this.createAuthorization().authorizationCode.getToken(options, function (error, result) {
        if (error) {
          console.error('Access Token Error', error.message);
          return res.json('Authentication failed');
        }

        return _this.createAuthorization().accessToken.create(result);
      });
    }
  }]);

  return AuthorizationService;
}();

exports.default = AuthorizationService;
module.exports = exports['default'];
//# sourceMappingURL=authorization.js.map
