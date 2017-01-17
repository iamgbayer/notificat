"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
  function Chat() {
    _classCallCheck(this, Chat);
  }

  _createClass(Chat, [{
    key: "sendStarterButton",
    value: function sendStarterButton(senderId, message) {
      this.sendRequest({
        setting_type: "call_to_actions",
        thread_state: "new_thread",
        call_to_actions: [{
          "message": {
            "text": "Test"
          }
        }]
      });
    }
  }, {
    key: "sendCardMessage",
    value: function sendCardMessage(senderId, message) {
      this.sendRequest({
        recipient: { id: senderId },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [{
                title: "[" + message.type + "] " + message.title,
                subtitle: message.subtitle,
                image_url: message.image_url,
                buttons: [{
                  type: "web_url",
                  url: message.url,
                  title: "View in github"
                }, {
                  type: "postback",
                  title: "Mark as read",
                  payload: "Payload for first element in a generic bubble"
                }]
              }]
            }
          }
        }
      });
    }
  }, {
    key: "sendTextMessage",
    value: function sendTextMessage(senderId, data) {
      this.sendRequest({
        recipient: { id: senderId },
        message: { text: data }
      });
    }
  }, {
    key: "sendPersistentMenu",
    value: function sendPersistentMenu(senderId, data) {
      this.sendRequest({
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
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(senderId, data) {
      this.sendRequest({
        recipient: { id: senderId },
        message: data
      });
    }
  }, {
    key: "sendRequest",
    value: function sendRequest(body) {
      request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: body
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

  return Chat;
}();
//# sourceMappingURL=chat.js.map
