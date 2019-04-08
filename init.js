const chalk = require('chalk');
const console = require('console');
const crypto = require('crypto');
const fs = require('fs');

const initDatabase = () => {
  const DB_PATH = 'database/database.sqlite';

  fs.writeFile(DB_PATH, '', { flag: 'a' }, (err) => {
    if (err) {
      throw err;
    }
  });

  return {
    TYPEORM_CONNECTION: 'sqlite',
    TYPEORM_DATABASE: DB_PATH,
    TYPEORM_ENTITIES: 'entities/**/*.js',
    TYPEORM_MIGRATIONS: 'database/migrations/*.js',
    TYPEORM_SUBSCRIBERS_DIR: 'subscribers/**/*.js',
  };
};

const initSecrets = () => ({
  HASH_SECRET: crypto.randomBytes(64).toString('hex'),
  JWT_SECRET: crypto.randomBytes(64).toString('hex'),
});

const init = () => {
  try {
    const env = Object.assign({}, initDatabase(), initSecrets());
    let envString = '';
    Object.keys(env).forEach((key) => {
      envString += `${key} = ${env[key]}\n`;
    });

    fs.writeFile('./.env', envString, { flag: 'w' }, (err) => {
      if (err) {
        throw err;
      }
    });

    console.log(chalk.green('Env file created.'));
  } catch (err) {
    console.error(chalk.red(err));
  }
};

init();
