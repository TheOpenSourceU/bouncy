#!/usr/bin/env node

/**
 * Frankly, the unit tests no longer work and I've not been able to work through updating them
 * because most/all issues is with dependencies not being available.
 *
 * This just provides a means for me to take the demo program and run it so I can step through the code and add
 * output where I please.
 *
 * http://theopensourceu.org/
 *
 * Original Source: https://github.com/TheOpenSourceU/bouncy/tree/tOSU/explore
 */

var bouncy = require('../index.js');
var state = true;

var server = bouncy(function (req, res, bounce) {
  console.log(req, res);
  if(state) {
    //bounce(8001);
    console.log('call bounce(8001)');
  } else {
    //bounce(8002)
    console.log('call bounce(8002)');
  }
  state = !state;


  // if (req.headers.host === 'beep.example.com') {
  //   bounce(8001);
  // }
  // else if (req.headers.host === 'boop.example.com') {
  //   bounce(8002);
  // }
  // else {
  //   res.statusCode = 404;
  //   res.end('no such host');
  // }
});
server.listen(8000);
console.log('bouncy should be running on 8000');



