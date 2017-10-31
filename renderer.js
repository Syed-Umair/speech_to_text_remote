const fs = require('fs');
const path = require('path');
const Speech = require('@google-cloud/speech');
const speech = new Speech({
  projectId: 'speechtotext-1505930986650',
  keyFilename: path.join(__dirname, 'auth.json')
});
const filename = 'test.wav';
const sampleRateHertz = 8000;
const languageCode = 'en-US';
const request = {
  config: {
    encoding: "LINEAR16",
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  }
};
const recognizeStream = speech.streamingRecognize(request)
.on('error', console.error)
.on('data', (data) => {
  console.log(data.results[0].alternatives[0].transcript);
  recognizeStream.destroy();
});
let mediaStream = fs.createReadStream(filename)
mediaStream.pipe(recognizeStream);