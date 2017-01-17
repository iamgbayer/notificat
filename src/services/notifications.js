import express from 'express';
import axios from 'axios';
import AuthorizationService from './authorization';

class NotificationsService {
  constructor () {};


  static getNotification (url = `https://api.github.com/notifications?per_page=1`) {
    let config = {
      headers: { "Authorization": `token ${GITHUB_USER_TOKEN}` },
      method: "GET"
    };

    return axios.get(url, config);
  };
}

export default NotificationsService;
