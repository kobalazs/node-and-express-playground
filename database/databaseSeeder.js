const chalk = require('chalk');
const console = require('console');
const typeorm = require('typeorm');
require('dotenv').config();

const userSeeder = require('./seeds/userSeeder');

console.info(chalk.green('Seeding database...'));

(async () => {
  try {
    await typeorm.createConnection();

    console.log('UserSeeder');
    await userSeeder();

    console.info(chalk.green('Seeding completed.'));
  } catch (error) {
    console.error(chalk.red(error));
  }
})();
