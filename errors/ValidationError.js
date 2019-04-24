const HttpError = require('./HttpError');

module.exports = class ValidationExport extends HttpError {
  constructor(data, ...args) {
    super(...args);
    this.status = this.status || 400;
    this.message = this.message || 'Form validation error!';
    this.data = data;
  }
};
