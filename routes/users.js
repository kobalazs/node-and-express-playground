const router = require('express').Router();
const typeorm = require('typeorm');
const User = require('../models/User');

/* GET users listing. */
router.get('/', async (_req, res, _next) => {
  const userRepository = typeorm.getRepository(User);
  const users = await userRepository.find();
  res.send(users);
});

module.exports = router;
