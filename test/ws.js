var test = require('tap').test;
var bouncy = require('../');
var WebSocket = require('ws');
var wc = require('wsclient');

test('ws', function (t) {
    t.plan(4);
    t.on('end', function () {
        s0.close();
        s1.close();
        setTimeout(process.exit, 100); // whatever
    });

    var p0 = Math.floor(Math.random() * (Math.pow(2,16) - 1e4) + 1e4);
    //var s0 = ws.createServer();
    var s0 = new WebSocket.Server({port: p0}, connect);
    s0.on('connection', function (c) {
        var msgs = [ 'beepity', 'boop' ];
        c.on('message', function (msg) {
            t.equal(msg, msgs.shift());
            c.send(msg.split('').reverse().join(''));
            if (msgs.length === 0) c.close();
        });
    });
    s0.on('error', function(er) {
        console.log('WebSocket', er);
    });

    //s0.listen(p0, connect);

    var p1 = Math.floor(Math.random() * (Math.pow(2,16) - 1e4) + 1e4);
    var s1 = bouncy(function (req, bounce) {
        bounce(p0);
    });
    s1.listen(p1, connect);
    
    var connected = 0;
    function connect () {
        if (++connected !== 2) return true;
        
        var c = wc.websocket('ws://localhost:' + p1 + '/'); //create a websocket to bouncy

        
        c.on('open', function () {
            c.send('beepity');
            setTimeout(function () {
                c.send('boop');
            }, 15);
        });

        c.connect();

        var msgs = [ 'ytipeeb', 'poob' ];
        c.on('message', function (buf) {
            t.equal(buf.toString(), msgs.shift());
        });
    }
});
