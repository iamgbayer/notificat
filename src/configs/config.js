"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var config = {
	"FACEBOOK_TOKEN": process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
	"FACEBOK_PAGE_URL": process.env.FACEBOOK_PAGE_URL,

	"CLIENT_ID": process.env.CLIENT_ID,
	"CLIENT_SECRET": process.env.CLIENT_SECRET,

	"TOKEN_HOST": process.env.TOKEN_HOST,
	"TOKEN_PATH": process.env.TOKEN_PATH,

	"AUTHORIZE_PATH": process.env.AUTHORIZE_PATH,

	"REDIRECT_URI": process.env.REDIRECT_URI,
	"REDIRECT_SCOPE": process.env.REDIRECT_SCOPE,
	"REDIRECT_STATE": process.env.REDIRECT_STATE
};

exports.default = config;
module.exports = exports["default"];
//# sourceMappingURL=config.js.map
