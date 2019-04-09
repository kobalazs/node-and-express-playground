const router = require('express').Router();
const multer = require('multer');

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const TaskController = require('../controllers/TaskController');

router.get('/', (_req, res, _next) => {
  res.send({
    message: 'Hello world!',
  });
});

router.post('/auth', multer().none(), AuthController.auth);

router.all('*', AuthController.protect);

router.get('/user', UserController.list);

router.get('/task', TaskController.list);
router.get('/task/:id', TaskController.show);
router.post('/task', multer().none(), TaskController.create);

router.all('*', (_req, res, _next) => {
  res.status(400).send({ error: 'Bad Request' });
});

module.exports = router;
