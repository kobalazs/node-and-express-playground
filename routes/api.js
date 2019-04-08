const router = require('express').Router();

const UserController = require('../controllers/UserController');

router.get('/', (_req, res, _next) => {
  res.send({
    message: 'Hello world!',
  });
});

router.get('/user', UserController.list);

module.exports = router;
