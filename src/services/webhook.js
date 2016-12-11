import config from '../../index';
import express from 'express';
import request from 'request';

class WebhookService {
  constructor () {};

  static tokenVerify (req, res) {
    if (req.query['hub.verify_token'] !== config.FACEBOOK_PAGE_ACCESS_TOKEN) {
      return res.send('Error, wrong token');
    }

    return res.send(req.query['hub.challenge']);
  }

  static messageEvent (req, res) {
    // let messagingEvents = req.body.entry[0].messaging;

    console.log(req.body)
  /*
    for (let i = 0; i < messagingEvents.length; i++) {
      let event = req.body.entry[0].messaging[i];
      let sender = event.sender.id;
      
      if (event.message && event.message.text) {
        let text = event.message.text;
        WebhookService.sendTextMessage(sender, `Text received, echo: ${text.substring(0, 200)}`, config.FACEBOOK_PAGE_ACCESS_TOKEN);
      }

      if (event.postback) {
        let text = JSON.stringify(event.postback);

        WebhookService.textMessage(sender, `Postback received: ${text.substring(0, 200)}`, config.FACEBOOK_PAGE_ACCESS_TOKEN);
        continue;
      }
    }*/

    // res.sendStatus(200);
  }

  textMessage (sender, text, token) {
    let messageData = { text: text }

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: token },
      method: 'POST',
      json: {
        recipient: { id: sender },
        message: messageData,
      }
    }, (error, response, body) => {
      if (error) {
        console.log('Error sending messages: ', error)
        return;
      }
      if (response.body.error) {
        console.log('Error: ', response.body.error)
        return;
      }
    })
  }
}

export default WebhookService;