'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _index = require('./src/routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

/**
 * Set application port
 */
app.set('port', process.env.PORT || 5000);

/**
 * Process application/x-www-form-urlencoded
 */
app.use(_bodyParser2.default.urlencoded({ extended: false }));

/**
 * Process application/json
 */
app.use(_bodyParser2.default.json());

/**
 * Set a root to api
 */
app.use('/api', _index2.default);

app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'));
});

exports.default = { app: app };
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
