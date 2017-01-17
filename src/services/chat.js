class Chat {
  constructor() { };


  sendStarterButton(senderId, message) {
    this.sendRequest({
      setting_type: "call_to_actions",
      thread_state: "new_thread",
      call_to_actions: [
        {
          "message": {
            "text": "Test"
          }
        }
      ]
    });
  };


  sendCardMessage(senderId, message) {
    this.sendRequest({
      recipient: { id: senderId },
      message: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              title: `[${message.type}] ${message.title}`,
              subtitle: message.subtitle,
              image_url: message.image_url,
              buttons: [{
                type: "web_url",
                url: message.url,
                title: "View in github"
              },
              {
                type: "postback",
                title: "Mark as read",
                payload: "Payload for first element in a generic bubble",
              }],
            }]
          }
        }
      }
    });
  };


  sendTextMessage(senderId, data) {
    this.sendRequest({
      recipient: { id: senderId },
      message: { text: data },
    });
  };


  sendPersistentMenu(senderId, data) {
    this.sendRequest({
      setting_type: "call_to_actions",
      thread_state: "existing_thread",
      call_to_actions: [
        {
          type: "web_url",
          title: "Notificat in github",
          payload: "https://github.com/guuibayer/notificat"
        },
        {
          type: "web_url",
          title: "Register user",
          url: "https://2d558d13.ngrok.io/api/auth"
        }
      ]
    });
  };


  sendMessage(senderId, data) {
    this.sendRequest({
      recipient: { id: senderId },
      message: data,
    });
  }


  sendRequest(body) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: body
    }, (error, response, body) => {
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
}
