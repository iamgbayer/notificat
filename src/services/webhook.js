'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebhookService = function () {
  function WebhookService() {
    _classCallCheck(this, WebhookService);
  }

  _createClass(WebhookService, [{
    key: 'textMessage',
    value: function textMessage(sender, text) {
      var messageData = { text: text };

      (0, _request2.default)({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: _index2.default.FACEBOOK_PAGE_ACCESS_TOKEN },
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
  }], [{
    key: 'tokenVerify',
    value: function tokenVerify(req, res) {
      if (req.query['hub.verify_token'] !== _index2.default.FACEBOOK_PAGE_ACCESS_TOKEN) {
        return res.send('Error, wrong token');
      }

      return res.send(req.query['hub.challenge']);
    }
  }, {
    key: 'messageEvent',
    value: function messageEvent(req, res) {
      var messagingEvents = req.body.entry[0].messaging;

      console.log(req.body);

      messagingEvents.map(function (messagingEvent) {
        console.log(messagingEvent);
      });

      /*
        for (let i = 0; i < messagingEvents.length; i++) {
          let event = req.body.entry[0].messaging[i];
          let sender = event.sender.id;
          
          if (event.message && event.message.text) {
            let text = event.message.text;
            WebhookService.sendTextMessage(sender, `Text received, echo: ${text.substring(0, 200)}`);
          }
           if (event.postback) {
            let text = JSON.stringify(event.postback);
             WebhookService.textMessage(sender, `Postback received: ${text.substring(0, 200)}`);
            continue;
          }
        }*/

      // res.sendStatus(200);
    }
  }]);

  return WebhookService;
}();

exports.default = WebhookService;
module.exports = exports['default'];
//# sourceMappingURL=webhook.js.map
