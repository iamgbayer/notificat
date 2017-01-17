import express from 'express';
import request from 'request';
import EventEmitter from 'eventemitter3';
import NotificationsService from './notifications';
import config from '../configs/config';
import cron from 'node-cron';

class WebhookService {
  constructor() { };


  static tokenVerify(req, res) {
    if (!req.query['hub.verify_token'] === config.FACEBOOK_PAGE_ACCESS_TOKEN) {
      return res.send('Error, wrong token');
    }

    return res.send(req.query['hub.challenge']);
  };


  static messageEvent(req, res) {
    let messagingEvents = req.body.entry[0].messaging;

    messagingEvents.map(messagingEvent => {
      let sender = messagingEvent.sender.id;

      return;
    });

    res.sendStatus(200);
  };


  static automaticMessageEvent(res) {
    NotificationsService.getNotification()
      .then(response => {
        response.data.map(data => {
          NotificationsService.getNotification(data.subject.url)
            .then(res => {
              let notification = {
                type: data.subject.type,
                title: data.subject.title,
                subtitle: data.repository.full_name,
                image_url: data.repository.owner.avatar_url,
                url: res.data.html_url
              };

              this.messageCard(sender, notification);
            });
        });
      });

    res.sendStatus(200);
  };
}

cron.schedule('*/2 * * * *', () => {
  WebhookService.automaticMessageEvent(res);
});

export default WebhookService;
