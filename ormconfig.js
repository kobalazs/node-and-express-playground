const fs = require('fs');

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
    'entities/**/*.js',
  ],
  migrations: ['database/migrations/*.js'],
  cli: {
    entitiesDir: 'entities',
    migrationsDir: 'database/migrations',
  },
};
