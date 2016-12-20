'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _authorization = require('./authorization');

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificationsService = function () {
  function NotificationsService() {
    _classCallCheck(this, NotificationsService);
  }

  _createClass(NotificationsService, [{
    key: 'getNotification',


    /**
     * Possible reason types
     *
     * ['subscribed', 'You are watching the repository'],
     * ['manual', 'You are subscribed to this thread'],
     * ['author', 'You created this thread'],
     * ['comment', 'New comment'],
     * ['mention', 'You were mentioned'],
     * ['team_mention', 'Your team was mentioned'],
     * ['state_change', 'Thread status changed'],
     * ['assign', 'You were assigned to the issue']
     */
    value: function getNotification() {
      var url = 'https://api.github.com/notifications?participating=true';
    }
  }], [{
    key: 'getToken',
    value: function getToken() {}
  }, {
    key: 'toCard',
    value: function toCard() {}
  }]);

  return NotificationsService;
}();

exports.default = NotificationsService;
module.exports = exports['default'];
//# sourceMappingURL=notifications.js.map
