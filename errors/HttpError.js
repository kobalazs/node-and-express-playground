module.exports = class HttpError extends Error {
  constructor(status, ...args) {
    super(...args);
    this.status = status;
  }
};
