const Router = require('@koa/router');
const authenticate = require('./authenticate.js');

const router = new Router();
router
  .get('/auth', authenticate.auth)
  .post('/login', authenticate.login)
  .get('/verifyCode', authenticate.verifyCode);
// .get('/a', (req) => {
//   console.log();
// });

module.exports = router;
