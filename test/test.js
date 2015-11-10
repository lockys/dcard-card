'use strict';
var DcardLogin = require('../index');
var d = new DcardLogin('username', 'password');
d.letsGetFriend((err, body) => {
  if (!err) {
    console.log(body);
  } else {
    console.error(err);
  }
});
