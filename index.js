const Koa = require('koa');
const fs = require('fs');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const serve = require('koa-static');
const router = require('./routes');

const pathOf404 = '/root/nginx/html/404/404.html';

const app = new Koa();

app.use(logger());

app.use(koaBody());

app.use(router.routes());

app.use(async (ctx, next) => {
  await next();
  if (ctx.response.status === 404) {
    ctx.body = fs.readFileSync(pathOf404);
    ctx.type = 'text/html; charset=utf-8';
  }
});

app.use(serve('./dist'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
