const fs = require('fs');
const UserSchema = require('./entities/UserSchema');

const DB_PATH = 'database/database.sqlite';

// create database file, if does not exist
fs.writeFile(DB_PATH, '', { flag: 'a' }, (err) => {
  if (err) {
    throw err;
  }
});

module.exports = {
  type: 'sqlite',
  database: DB_PATH,
  logging: false,
  entities: [
    UserSchema,
  ],
  migrations: ['database/migrations/*.js'],
  cli: {
    migrationsDir: 'database/migrations',
  },
};
