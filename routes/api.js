const router = require('express').Router();
const multer = require('multer');
const cors = require('cors');

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const TaskController = require('../controllers/TaskController');

router.use(cors());

router.get('/', (_req, res, _next) => {
  res.send({
    message: 'Hello world!',
  });
});
router.post('/user/register', multer().none(), UserController.register);
router.post('/auth', multer().none(), AuthController.auth);

router.all('*', AuthController.protect);

router.get('/user', UserController.list);
router.get('/user/:id', UserController.show);
router.put('/user/:id', multer().none(), UserController.update);

router.get('/task', TaskController.list);
router.get('/task/:id', TaskController.show);
router.post('/task', multer().none(), TaskController.create);
router.put('/task/:id', multer().none(), TaskController.update);
router.delete('/task/:id', TaskController.delete);

router.all('*', (_req, res, _next) => {
  res.status(400).send({ message: 'Bad Request', status: 400 });
});

module.exports = router;
