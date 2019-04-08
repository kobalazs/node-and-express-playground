const typeorm = require('typeorm');

const User = require('../../models/User');
const Task = require('../../models/Task');

module.exports = async () => {
  const user = await typeorm.getRepository(User).findOne({ email: 'test@example.com' });

  const tasks = [
    new Task({
      user_id: user.id,
      name: 'Test Task',
    }),
  ];

  await typeorm.getRepository(Task).save(tasks);
};
