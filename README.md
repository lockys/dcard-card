dcard-card
==
Get your card of `Dcard` today

Install
==
```sh
$ npm i dcard-card
```

Usage
==
```javascript
'use strict';
var DcardLogin = require('dcard-card');
var d = new DcardLogin('username', 'password');
d.letsGetFriend((err, body) => {
  if (!err) {
    console.log(body);
  } else {
    console.error(err);
  }
});
```
**Output**
```
{ gender: 'M',
     school: '大學',
     department: '某某系',
     grade: '畢業',
     talent: '我愛電影',
     club: '參加過籃球系隊',
     lecture: '都喜歡',
     lovedcountry: '台灣',
     trouble: '長太帥',
     exchange: '電影',
     wanttotry: '不知道QQ',
     photo: '<id>.jpg',
     createdAt: '0000-00-00 00:00:00',
     updatedAt: '2013-08-10T14:46:01.000Z',
     level: 3 },
  connection: { id: <id>, accept: false },
  both_accept: false }
```
LICENSE
==
MIT
