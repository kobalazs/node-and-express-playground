const typeorm = require('typeorm');
const validate = require('validate.js');

const Task = require('../models/Task');
const taskSchema = require('../entities/TaskSchema');
const HttpError = require('../errors/HttpError');
const ValidationError = require('../errors/ValidationError');

module.exports = {
  list: async (req, res, _next) => {
    const taskRepository = typeorm.getRepository(Task);
    const tasks = await taskRepository.find({ user_id: req.user.id });

    res.send(tasks.map(task => taskSchema.transform(task)));
  },
  show: async (req, res, next) => {
    try {
      const taskRepository = typeorm.getRepository(Task);
      const task = await taskRepository.findOneOrFail({ id: req.params.id, user_id: req.user.id });
      res.send(task);
    } catch (error) {
      next(new HttpError(404, 'Task not found!'));
    }
  },
  create: async (req, res, next) => {
    try {
      const taskRepository = typeorm.getRepository(Task);
      const validationFailures = validate(req.body, taskSchema.getConstraints());
      if (validationFailures) {
        throw new ValidationError(validationFailures);
      }

      const newTask = new Task(req.body);
      newTask.user_id = req.user.id;
      const savedTask = await taskRepository.save(newTask);
      res.send(savedTask);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const validationFailures = validate(req.body, taskSchema.getConstraints());
      if (validationFailures) {
        throw new ValidationError(validationFailures);
      }

      const taskRepository = typeorm.getRepository(Task);
      const task = await taskRepository.findOneOrFail({ id: req.params.id, user_id: req.user.id });
      task.fill(req.body);

      const savedTask = await taskRepository.save(task);
      res.send(savedTask);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const taskRepository = typeorm.getRepository(Task);
      // At the moment Repository.delete() does not return any usable data,
      // thus we cannot handle failures. See https://github.com/typeorm/typeorm/issues/2415
      await taskRepository.delete({ id: req.params.id, user_id: req.user.id });
      res.send({});
    } catch (error) {
      next(new HttpError(404, 'Task not found!'));
    }
  },
};
