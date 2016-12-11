'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authorization = require('../services/authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/auth', function (req, res) {
  var authorization = new _authorization2.default();

  authorization.authorizationRedirect(res);
});

router.get('/callback', function (req, res) {
  var code = req.query.code;
  var options = {
    code: code
  };

  _authorization2.default.getToken(options, res);
});

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=authorization.js.map
