const router = require('express').Router();
const multer = require('multer');

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');

router.get('/', (_req, res, _next) => {
  res.send({
    message: 'Hello world!',
  });
});

router.post('/auth', multer().none(), AuthController.auth);

router.all('*', AuthController.protect);

router.get('/user', UserController.list);

module.exports = router;
