const console = require('console');
const Sequelize = require('sequelize');

const DB_PATH = 'database/database.sqlite';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DB_PATH,
});

(async () => {
  const Lorem = sequelize.define('lorem', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    info: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  await Lorem.sync({ force: true });

  const results = [];
  for (let i = 0; i < 10; i++) {
    results.push(Lorem.create({
      info: `Ipsum ${i}`,
    }));
  }
  await Promise.all(results);

  const lorems = await Lorem.findAll();
  lorems.forEach((lorem) => console.log(`${lorem.id}: ${lorem.info}`));
})();
