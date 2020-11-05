'use strict';

const users = [{ id: '1', phone: '17828228827', password: 'youling' }];

module.exports.findByPhone = async (phone) => {
  for (let i = 0, len = users.length; i < len; i++) {
    if (users[i].phone === phone) return users[i];
  }
  throw new Error('User Not Found');
};
