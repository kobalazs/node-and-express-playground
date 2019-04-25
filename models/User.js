const crypto = require('crypto');

class User {
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.fill(data);
    }
  }

  fill(data) {
    this.name = data.name;
    this.email = data.email;
    this.password = User.hash(data.password);
  }

  isPasswordMatch(password) {
    return this.password === User.hash(password);
  }

  static hash(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password + process.env.HASH_SECRET);
    return hash.digest('hex');
  }
}

module.exports = User;
