'use strict';

app.get('/webhook/', function (req, res) {
  if (!req.query['hub.verify_token'] === token) {
    return res.send('Error, wrong token');
  }

  return res.send(req.query['hub.challenge']);
})

app.post('/webhook/', function (req, res) {
  let messagingEvents = req.body.entry[0].messaging;

  console.log(req.body);

  for (let i = 0; i < messagingEvents.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let sender = event.sender.id;
    
    if (event.message && event.message.text) {
      let text = event.message.text;

      if (text === 'Generic') {
        sendGenericMessage(sender, token);
        continue;
      }

      sendTextMessage(sender, `Text received, echo: ${text.substring(0, 200)}`, token);
    }

    if (event.postback) {
      let text = JSON.stringify(event.postback);

      sendTextMessage(sender, `Postback received: ${text.substring(0, 200)}`, token);
      continue;
    }
  }

  res.sendStatus(200);
})