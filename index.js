const Koa = require('koa');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const serve = require('koa-static');
const router = require('./routes');

const app = new Koa();

app.use(logger());

app.use(koaBody());

app.use(router.routes());

app.use(serve('./dist'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
