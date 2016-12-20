import express from 'express';
import request from 'request';
import config from '../configs/config';
import NotificationsService from './notifications';

class WebhookService {
  constructor () {};

  static tokenVerify (req, res) {
    if (!req.query['hub.verify_token'] === config.FACEBOOK_PAGE_ACCESS_TOKEN) {
      return res.send('Error, wrong token');
    }

    return res.send(req.query['hub.challenge']);
  }


  static messageEvent (req, res) {
    let messagingEvents = req.body.entry[0].messaging;

    messagingEvents.map(messagingEvent => {
      if (messagingEvent.message) {
        let sender = messagingEvent.sender.id;
        let message = messagingEvent.message.text;

        this.setStartedButton();
        this.setPersistentMenu();
        // this.textMessage(sender, message);
        this.cardMessage(sender);
        return;
      }
    });

    res.sendStatus(200);
  }


  static cardMessage (sender, message) {
    let messageData = {
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
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        recipient: { id:sender },
        message: messageData,
      }
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


  static textMessage (sender, messages) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        recipient: { id: sender },
        message: { text: messages },
      }
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


  static setStartedButton () {
    request({
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
      qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        setting_type: "call_to_actions",
        thread_state: "new_thread",
        call_to_actions: [
          {
            "message": {
              "text": "Test"
            }
          }
        ]
      }
    }, (error, response, body) => {
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


  static setPersistentMenu () {
    request({
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
      qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
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
      }
    }, (error, response, body) => {
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
}

export default WebhookService;
