const { EntitySchema } = require('typeorm');

module.exports = class BaseSchema extends EntitySchema {
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
