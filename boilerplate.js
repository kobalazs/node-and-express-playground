const console = require('console');
const typeorm = require('typeorm');

const User = require('./models/User');

(async () => {
  const connection = await typeorm.createConnection();
  const userRepository = connection.getRepository(User);

  const user = new User({
    name: 'Test User',
    email: 'test2@example.com',
    password: 'secret',
  });
  userRepository.save(user).then(() => {
    console.log(user);
  }).catch((error) => {
    console.error(error);
  }).finally(() => {
    connection.close();
  });
})();
