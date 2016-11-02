'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authorization = require('./authorization');

var _authorization2 = _interopRequireDefault(_authorization);

var _webhook = require('./webhook');

var _webhook2 = _interopRequireDefault(_webhook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/', _authorization2.default);

exports.default = router;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
