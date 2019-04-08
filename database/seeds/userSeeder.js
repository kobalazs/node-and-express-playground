const typeorm = require('typeorm');
const User = require('../../models/User');

const users = [
  new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'secret',
  }),
];

module.exports = async () => {
  const userRepository = typeorm.getRepository(User);
  await userRepository.save(users);
};
