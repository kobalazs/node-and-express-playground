module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    name: 'Tobias Test',
    email: 'test@example.com',
    password: 'secret',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
