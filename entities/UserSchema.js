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
      constraints: {
        presence: true,
        length: { minimum: 1, maximum: 255 },
      },
    },
    email: {
      type: 'varchar',
      unique: true,
      constraints: {
        presence: true,
        length: { minimum: 1, maximum: 255 },
        email: true,
      },
    },
    password: {
      type: 'varchar',
      hidden: true,
      constraints: {
        presence: true,
        length: { minimum: 1, maximum: 255 },
      },
    },
  },
  relations: {},
});
