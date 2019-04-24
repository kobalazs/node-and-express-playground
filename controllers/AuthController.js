const typeorm = require('typeorm');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const userSchema = require('../entities/UserSchema');
const HttpError = require('../errors/HttpError');

module.exports = {
  auth: async (req, res, next) => {
    try {
      const userRepository = typeorm.getRepository(User);
      const user = await userRepository.findOne({ email: req.body.email });

      if (!user || !user.isPasswordMatch(req.body.password)) {
        throw new HttpError(401, 'Invalid credentials!');
      }

      res.status(200).json({
        token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }),
        user: userSchema.transform(user),
      });
    } catch (error) {
      next(error);
    }
  },

  protect: async (req, _res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async (_err, payload) => {
      if (payload) {
        const userRepository = typeorm.getRepository(User);
        req.user = await userRepository.findOne(payload.userId);
      }
      next(req.user ? undefined : new HttpError(401, 'Token invalid or expired!'));
    });
  },
};
