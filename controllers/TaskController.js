const typeorm = require('typeorm');
const validate = require('validate.js');

const Task = require('../models/Task');
const taskSchema = require('../entities/TaskSchema');
const ValidationError = require('../errors/ValidationError');

module.exports = {
  list: async (req, res, _next) => {
    const taskRepository = typeorm.getRepository(Task);
    const tasks = await taskRepository.find({ user_id: req.user.id });

    res.send(tasks.map(task => taskSchema.transform(task)));
  },
  show: async (req, res, _next) => {
    try {
      const taskRepository = typeorm.getRepository(Task);
      const task = await taskRepository.findOneOrFail({ id: req.params.id, user_id: req.user.id });
      res.send(task);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  },
  create: async (req, res, _next) => {
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
      res.status(error.status || 500).send(error);
    }
  },
};
