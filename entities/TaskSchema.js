const BaseSchema = require('./BaseSchema');
const Task = require('../models/Task');

module.exports = new BaseSchema({
  name: 'Task',
  target: Task,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    user_id: {
      type: 'int',
    },
    name: {
      type: 'varchar',
    },
    color: {
      type: 'varchar',
    },
    position: {
      type: 'int',
    },
    is_done: {
      type: 'varchar',
    },
    created_at: {
      type: 'varchar',
    },
  },
  relations: {},
});
