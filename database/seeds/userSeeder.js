const typeorm = require('typeorm');

const User = require('../../models/User');

module.exports = async () => {
  const users = [
    new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'secret',
    }),
  ];

  await typeorm.getRepository(User).save(users);
};
