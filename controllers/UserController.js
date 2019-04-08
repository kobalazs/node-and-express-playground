const typeorm = require('typeorm');
const User = require('../models/User');

module.exports = {
  list: async (_req, res, _next) => {
    const userRepository = typeorm.getRepository(User);
    const users = await userRepository.find();
    res.send(users);
  },
};
