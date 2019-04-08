const typeorm = require('typeorm');

const User = require('../models/User');
const userSchema = require('../entities/UserSchema');

module.exports = {
  list: async (_req, res, _next) => {
    const userRepository = typeorm.getRepository(User);
    const users = await userRepository.find();

    res.send(users.map(user => userSchema.transform(user)));
  },
};
