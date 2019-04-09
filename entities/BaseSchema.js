const { EntitySchema } = require('typeorm');

module.exports = class BaseSchema extends EntitySchema {
  getConstraints() {
    const constraints = {};
    const { columns } = this.options;

    Object.keys(columns).forEach((columnName) => {
      if (columns[columnName].constraints) {
        constraints[columnName] = columns[columnName].constraints;
      }
    });

    return constraints;
  }

  transform(model) {
    const result = {};
    const { columns } = this.options;

    Object.keys(columns).forEach((columnName) => {
      if (!columns[columnName].hidden) {
        result[columnName] = model[columnName];
      }
    });

    return result;
  }
};
