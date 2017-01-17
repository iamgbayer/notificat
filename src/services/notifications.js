'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _authorization = require('./authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationsService = function () {
  function NotificationsService() {
    _classCallCheck(this, NotificationsService);
  }

  _createClass(NotificationsService, null, [{
    key: 'getNotification',
    value: function getNotification() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://api.github.com/notifications?per_page=1';

      var config = {
        headers: { "Authorization": 'token ' + GITHUB_USER_TOKEN },
        method: "GET"
      };

      return _axios2.default.get(url, config);
    }
  }]);

  return NotificationsService;
}();

exports.default = NotificationsService;
module.exports = exports['default'];
//# sourceMappingURL=notifications.js.map
