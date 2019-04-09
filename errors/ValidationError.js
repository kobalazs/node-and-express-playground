module.exports = class ValidationExport extends Error {
  constructor(data, ...args) {
    super(...args);
    this.status = this.status || 400;
    this.message = this.message || 'Form validation error!';
    this.data = data;
  }
};
