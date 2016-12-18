import express from 'express';
import request from 'request';
import AuthorizationService from './authorization';

class NotificationsService {
  constructor () {}


  static getToken () {

  }


  /**
   * Possible reason types
   *
   * ['subscribed', 'You are watching the repository'],
   * ['manual', 'You are subscribed to this thread'],
   * ['author', 'You created this thread'],
   * ['comment', 'New comment'],
   * ['mention', 'You were mentioned'],
   * ['team_mention', 'Your team was mentioned'],
   * ['state_change', 'Thread status changed'],
   * ['assign', 'You were assigned to the issue']
   */
  getNotification () {
    let url = `https://api.github.com/notifications?participating=true`;
  }
}

export default NotificationsService;
