import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/index';

const app = express();

const config = {
	FACEBOOK_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
	FACEBOK_PAGE_URL: process.env.FACEBOOK_PAGE_URL,

	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	
	TOKEN_HOST: process.env.TOKEN_HOST,
	TOKEN_PATH: process.env.TOKEN_PATH,
	
	AUTHORIZE_PATH: process.env.AUTHORIZE_PATH,

	REDIRECT_URI: process.env.REDIRECT_URI,
	REDIRECT_SCOPE: process.env.REDIRECT_SCOPE,
	REDIRECT_STATE: process.env.REDIRECT_STATE
};

const FACEBOOK_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
const FACEBOK_PAGE_URL = process.env.FACEBOOK_PAGE_URL;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const TOKEN_HOST = process.env.TOKEN_HOST;
const TOKEN_PATH = process.env.TOKEN_PATH;
const AUTHORIZE_PATH = process.env.AUTHORIZE_PATH;

const REDIRECT_URI = process.env.REDIRECT_URI;
const REDIRECT_SCOPE = process.env.REDIRECT_SCOPE;
const REDIRECT_STATE = process.env.REDIRECT_STATE;

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(app.get('port'), function () {
	console.log('running on port', app.get('port'));
})

function sendTextMessage(sender, text, token) {
	let messageData = { text: text }

	request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: {
			recipient: {id: sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

function sendGenericMessage(sender, token) {
	let messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [{
					"title": "First card",
					"subtitle": "Element #1 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/rift.png",
					"buttons": [{
						"type": "web_url",
						"url": "https://www.messenger.com",
						"title": "web url"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for first element in a generic bubble",
					}],
				}, {
					"title": "Second card",
					"subtitle": "Element #2 of an hscroll",
					"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
					"buttons": [{
						"type": "postback",
						"title": "Postback",
						"payload": "Payload for second element in a generic bubble",
					}],
				}]
			}
		}
	}

	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

export default {app, config};