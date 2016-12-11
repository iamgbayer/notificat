'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../configs/config');

var _config2 = _interopRequireDefault(_config);

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

      console.log(req.body);

      /*messagingEvents.map(messagingEvent => {
        console.log(req.body)
        let messages = messagingEvent.message;
        let sender = messagingEvent.sender;
         // console.log('Destinatário: ', sender, 'Mensagem: ', messages)
      })*/
      for (var i = 0; i < messagingEvents.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;

        WebhookService.textMessage(sender, event.message.text);
      }

      res.sendStatus(200);
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
  }]);

  return WebhookService;
}();

exports.default = WebhookService;
module.exports = exports['default'];
//# sourceMappingURL=webhook.js.map
