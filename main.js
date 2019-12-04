const websocket = require('ws');
const fs = require('fs');
const ws = new websocket('https://speech.samespace.com/stt?token=<token>');

ws.on('open', function open() {
  var readStream = fs.createReadStream('/path/to/wav/file/file.wav');
  readStream.on('data', function (chunk) {
      ws.send(chunk);
  });
  readStream.on('end', function () {
      ws.send('END');
  });
});

ws.on('message', function incoming(data) {
  console.log(data);
});

ws.on('close', function close() {
  process.exit()
});
