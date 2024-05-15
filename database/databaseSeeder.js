const console = require('console');
const typeorm = require('typeorm');
require('dotenv').config();

const userSeeder = require('./seeds/userSeeder');
const taskSeeder = require('./seeds/taskSeeder');

console.info('Seeding database...');

(async () => {
  try {
    await typeorm.createConnection();

    console.log('UserSeeder');
    await userSeeder();

    console.log('TaskSeeder');
    await taskSeeder();

    console.info('Seeding completed.');
  } catch (error) {
    console.error(error);
  }
})();
