const typeorm = require('typeorm');
const validate = require('validate.js');

const User = require('../models/User');
const userSchema = require('../entities/UserSchema');
const HttpError = require('../errors/HttpError');
const ValidationError = require('../errors/ValidationError');

module.exports = {
  list: async (_req, res, _next) => {
    const userRepository = typeorm.getRepository(User);
    const users = await userRepository.find();

    res.send(users.map(user => userSchema.transform(user)));
  },
  show: async (req, res, next) => {
    try {
      const userRepository = typeorm.getRepository(User);
      const user = await userRepository.findOneOrFail({ id: req.params.id });
      res.send(user);
    } catch (error) {
      next(new HttpError(404, 'User not found!'));
    }
  },
  register: async (req, res, next) => {
    try {
      const validationFailures = validate(req.body, userSchema.getConstraints());
      if (validationFailures) {
        throw new ValidationError(validationFailures);
      }

      const userRepository = typeorm.getRepository(User);
      const newUser = new User();
      newUser.fill(req.body);

      const savedUser = await userRepository.save(newUser);
      res.send(savedUser);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      if (parseInt(req.params.id, 10) !== req.user.id) {
        throw new HttpError(404, 'You can only modify your own user.');
      }
      const validationFailures = validate(req.body, userSchema.getConstraints());
      if (validationFailures) {
        throw new ValidationError(validationFailures);
      }

      const userRepository = typeorm.getRepository(User);
      const user = await userRepository.findOneOrFail({ id: req.params.id });
      user.fill(req.body);

      const savedUser = await userRepository.save(user);
      res.send(savedUser);
    } catch (error) {
      next(error);
    }
  },
};
