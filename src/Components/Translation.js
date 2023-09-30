// translation.js

const { Translate } = require('@google-cloud/translate');

// Initialize the Translation API client with credentials from environment variables
const translate = new Translate({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

module.exports = translate;
