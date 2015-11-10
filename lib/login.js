'use strict';
const LOGIN_URL = 'https://www.dcard.tw/api/member/login';
const FRIEND_URL = 'https://www.dcard.tw/api/dcard';
var urllib = require('urllib');
var request = require('request');

class DcardLogin {
  constructor(user, password) {
    this.user = user || '';
    this.password = password || '';
    this.cookiesObj = '';
    this.callback = undefined;
  }

  letsGetFriend(cb) {
    if (typeof cb !== 'function') {
      console.error(new Error('callback must be a function.'));
      return;
    } else {
      this.callback = cb;
    }

    let _this = this;
    urllib.request(LOGIN_URL, (err, data, res) => {
      if (err && res.statusCode !== 200) {
        throw err;
      }

      let tokenAndSid = _this.getTokenAndSid(res.headers['set-cookie']);
      _this.login(tokenAndSid);
    });

  }

  getTokenAndSid(cookies) {
    let returns = {
      token: cookies[0].split('=')[1].split(';')[0],
      sid: cookies[1].split(';')[0],
    };
    return returns;
  }

  login(tokenAndSid) {
    this.cookiesObj = tokenAndSid;
    let _this = this;
    request({
      url: LOGIN_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-XSRF-TOKEN': tokenAndSid.token,
        cookie: 'XSRF-TOKEN=' + tokenAndSid.token + ';' + tokenAndSid.sid + ';',
      },
      json: {
        user: _this.user,
        password: _this.password,
      },
    }, this.getYourDestiney.bind(this));
  }

  getYourDestiney(err, res, body) {
    let _this = this;
    request({
      url: FRIEND_URL,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-XSRF-TOKEN': _this.cookiesObj.token,
        cookie: 'XSRF-TOKEN=' + _this.cookiesObj.token + ';' + _this.cookiesObj.sid + ';',
      },
      json: {
        user: _this.user,
        password: _this.password,
      },
    }, (err, res, body) => {
      this.callback(err, body.dcard);
    });
  }
};

module.exports = exports = DcardLogin;
