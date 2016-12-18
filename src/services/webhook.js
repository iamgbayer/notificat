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

        this.getStarted();
        this.persistentMenu();
        this.textMessage(sender, message);
        return;
      }
    });

    res.sendStatus(200);
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


  static getStarted () {
    request({
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
      qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        setting_type: 'call_to_actions',
        thread_state: 'new_thread',
        call_to_actions: [
          {
            payload: "USER_DEFINED_PAYLOAD"
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


  static persistentMenu () {
    request({
      url: 'https://graph.facebook.com/v2.6/me/thread_settings',
      qs: { access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        setting_type: 'call_to_actions',
        thread_state: 'existing_thread',
        call_to_actions: [
          {
            type: "postback",
            title: "Marcar como lido",
            payload: ""
          },
          {
            type: "web_url",
            title: "Logar usuário",
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
