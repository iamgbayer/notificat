import config from '../../index';
import express from 'express';
import request from 'request';

class WebhookService {
  constructor () {};

  tokenVerify (req, res) {
    if (!req.query['hub.verify_token'] === config.FACEBOOK_TOKEN) {
      return res.send('Error, wrong token');
    }

    return res.send(req.query['hub.challenge']);
  }

  messageEvent (req, res) {
    let messagingEvents = req.body.entry[0].messaging;

    console.log(req.body);

    for (let i = 0; i < messagingEvents.length; i++) {
      let event = req.body.entry[0].messaging[i];
      let sender = event.sender.id;
      
      if (event.message && event.message.text) {
        let text = event.message.text;

        if (text === 'Generic') {
          sendGenericMessage(sender, config.FACEBOOK_TOKEN);
          continue;
        }

        sendTextMessage(sender, `Text received, echo: ${text.substring(0, 200)}`, config.FACEBOOK_TOKEN);
      }

      if (event.postback) {
        let text = JSON.stringify(event.postback);

        sendTextMessage(sender, `Postback received: ${text.substring(0, 200)}`, config.FACEBOOK_TOKEN);
        continue;
      }
    }

    res.sendStatus(200);
  }
}

export default WebhookService;