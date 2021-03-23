'use strict';
const users = [
  {
    user_id: 1,
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    user_id: 2,
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },
];

const getUserLogin = (email) => users.find((user) => user.email === email);

module.exports = {
  users,
  getUserLogin,
};
