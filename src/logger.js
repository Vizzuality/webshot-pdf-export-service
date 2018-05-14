const bunyan = require('bunyan');
const isProd = process.env.NODE_ENV === 'production';

/**
 * Create Logger
 */
module.exports = (() => {
  const streams = [{
    level: isProd ? 'warn' : 'debug',
    stream: process.stdout
  }];

  const logger = bunyan.createLogger({
    name: 'webshot-pdf-service',
    src: true,
    streams
  });

  return logger;
})();
