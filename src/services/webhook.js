'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('../configs/config');

var _config2 = _interopRequireDefault(_config);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

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
      var _this = this;

      var messagingEvents = req.body.entry[0].messaging;

      messagingEvents.map(function (messagingEvent) {
        if (messagingEvent.message) {
          var sender = messagingEvent.sender.id;
          var message = messagingEvent.message.text;

          _this.setStartedButton();
          _this.setPersistentMenu();
          // this.textMessage(sender, message);
          _this.cardMessage(sender);
          return;
        }
      });

      res.sendStatus(200);
    }
  }, {
    key: 'cardMessage',
    value: function cardMessage(sender, message) {
      var messageData = {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              // title: "Issue, Refactoring in gulpfile",
              subtitle: "You created this thread",
              image_url: "https://avatars.githubusercontent.com/u/5483459?v=3",
              buttons: [{
                type: "web_url",
                url: "https://github.com/guuibayer/notificat/issues/13",
                title: "View in github"
              }, {
                type: "postback",
                title: "Mark as read",
                payload: "Payload for first element in a generic bubble"
              }]
            }]
          }
        }
      };
      (0, _request2.default)({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: _config2.default.FACEBOOK_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          recipient: { id: sender },
          message: messageData
        }
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending messages: ', error);
          return;
        }

        if (response.body.error) {
          console.log('Error: ', response.body.error);
          return;
        }
      });
    }
  }, {
    key: 'textMessage',
    value: function textMessage(sender, messages) {
      (0, _request2.default)({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: _config2.default.FACEBOOK_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          recipient: { id: sender },
          message: { text: messages }
        }
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending messages: ', error);
          return;
        }

        if (response.body.error) {
          console.log('Error: ', response.body.error);
          return;
        }
      });
    }
  }, {
    key: 'setStartedButton',
    value: function setStartedButton() {
      (0, _request2.default)({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: { access_token: _config2.default.FACEBOOK_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          setting_type: "call_to_actions",
          thread_state: "new_thread",
          call_to_actions: [{
            "message": {
              "text": "Test"
            }
          }]
        }
      }, function (error, response, body) {
        if (error) {
          console.log('Error to set get started button: ', error);
          return;
        }

        if (response.body.error) {
          console.log('Error: ', response);
          return;
        }
      });
    }
  }, {
    key: 'setPersistentMenu',
    value: function setPersistentMenu() {
      (0, _request2.default)({
        url: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: { access_token: _config2.default.FACEBOOK_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
          setting_type: "call_to_actions",
          thread_state: "existing_thread",
          call_to_actions: [{
            type: "web_url",
            title: "Notificat in github",
            payload: "https://github.com/guuibayer/notificat"
          }, {
            type: "web_url",
            title: "Register user",
            url: "https://2d558d13.ngrok.io/api/auth"
          }]
        }
      }, function (error, response, body) {
        if (error) {
          console.log('Error to set persistent menu: ', error);
          return;
        }

        if (response.body.error) {
          console.log('Error: ', response);
          return;
        }
      });
    }
  }]);

  return WebhookService;
}();

exports.default = WebhookService;
module.exports = exports['default'];
//# sourceMappingURL=webhook.js.map
