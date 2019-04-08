const BaseSchema = require('./BaseSchema');
const User = require('../models/User');

module.exports = new BaseSchema({
  name: 'User',
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    password: {
      type: 'varchar',
      hidden: true,
    },
  },
  relations: {},
});
