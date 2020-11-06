const jwt = require('jsonwebtoken');
const db = require('../db');

const tokenSecret = '#(Hw$)%;wer1';
const codeSecret = '*)234DQADe)#';

module.exports.login = async (ctx) => {
  try {
    const { phone, password } = ctx.request.body;
    const user = await db.users.findByPhone(phone);
    if (user.password !== password) {
      throw new Error('Incorrect Password');
    }
    const token = jwt.sign({ user }, tokenSecret, { expiresIn: '50d' });
    ctx.cookies.set('token', token, { maxAge: 1000 * 3600 * 24 * 50 });
    const returnTo = ctx.cookies.get('ssoLoginReturnTo') || '/';
    ctx.cookies.set('ssoLoginReturnTo', '', { maxAge: 0 });
    ctx.body = { returnTo };
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: error.message };
  }
};

function isLogin(ctx) {
  try {
    const token = ctx.cookies.get('token');
    const { user } = jwt.verify(token, tokenSecret);
    ctx.request.user = user;
    return true;
  } catch {
    return false;
  }
}

module.exports.auth = (ctx) => {
  if (isLogin(ctx)) {
    const user = ctx.request.user;
    const code = jwt.sign({ user }, codeSecret, { expiresIn: 600 });
    const redirectURL = new URL(ctx.query.redirectTo);
    redirectURL.searchParams.set('code', code);
    ctx.redirect(redirectURL.href);
  } else {
    ctx.cookies.set('ssoLoginReturnTo', ctx.path + ctx.search);
    ctx.redirect('/');
  }
};

module.exports.verifyCode = (ctx) => {
  try {
    const { code } = ctx.request.query;
    const { user } = jwt.verify(code, codeSecret);
    ctx.body = user;
  } catch (error) {
    ctx.body = { error: error.message };
  }
};
