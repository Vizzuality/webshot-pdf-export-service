const Koa = require('koa');
const loader = require('loader');
const convert = require('koa-convert');
const ErrorSerializer = require('serializers/error.serializer');

const koaBody = require('koa-body')({
  multipart: true,
  jsonLimit: '50mb',
  formLimit: '50mb',
  textLimit: '50mb'
});

const app = new Koa();

app.use(convert(koaBody));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let error = err;
    try {
      error = JSON.parse(err);
    } catch (e) {
      logger.error('Error parse');
    }
    ctx.status = error.status || 500;
    logger.error(error);
    ctx.body = ErrorSerializer.serializeError(ctx.status, error.message);
    if (process.env.NODE_ENV === 'prod' && this.status === 500) {
      ctx.body = 'Unexpected error';
    }
    ctx.response.type = 'application/vnd.api+json';
  }

});

loader.loadRoutes(app);

logger.info('Server started in ', process.env.PORT);
