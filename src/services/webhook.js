'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

var _config = require('../configs/config');

var _config2 = _interopRequireDefault(_config);

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebhookService = function () {
  function WebhookService() {
    _classCallCheck(this, WebhookService);
  }

  _createClass(WebhookService, null, [{
    key: 'tokenVerify',
    value: function tokenVerify(req, res) {
      if (!req.query['hub.verify_token'] === _config2.default.FACEBOOK_PAGE_ACCESS_TOKEN) {
        return res.send('Error, wrong token');
      }

      return res.send(req.query['hub.challenge']);
    }
  }, {
    key: 'messageEvent',
    value: function messageEvent(req, res) {
      var messagingEvents = req.body.entry[0].messaging;

      messagingEvents.map(function (messagingEvent) {
        var sender = messagingEvent.sender.id;

        return;
      });

      res.sendStatus(200);
    }
  }, {
    key: 'automaticMessageEvent',
    value: function automaticMessageEvent(res) {
      var _this = this;

      _notifications2.default.getNotification().then(function (response) {
        response.data.map(function (data) {
          _notifications2.default.getNotification(data.subject.url).then(function (res) {
            var notification = {
              type: data.subject.type,
              title: data.subject.title,
              subtitle: data.repository.full_name,
              image_url: data.repository.owner.avatar_url,
              url: res.data.html_url
            };

            _this.messageCard(sender, notification);
          });
        });
      });

      res.sendStatus(200);
    }
  }]);

  return WebhookService;
}();

_nodeCron2.default.schedule('*/2 * * * *', function () {
  WebhookService.automaticMessageEvent(res);
});

exports.default = WebhookService;
module.exports = exports['default'];
//# sourceMappingURL=webhook.js.map
