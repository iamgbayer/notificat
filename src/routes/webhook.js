'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webhook = require('../services/webhook');

var _webhook2 = _interopRequireDefault(_webhook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/webhook', function (req, res) {
  _webhook2.default.tokenVerify(req, res);
});

router.post('/webhook', function (req, res) {
  _webhook2.default.messageEvent(req, res);
});

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=webhook.js.map
