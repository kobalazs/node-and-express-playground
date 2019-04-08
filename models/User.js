const crypto = require('crypto');

class User {
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.password = User.hash(data.password);
    }
  }

  static hash(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password + process.env.HASH_SECRET);
    return hash.digest('hex');
  }

  isPasswordMatch(password) {
    return this.password === User.hash(password);
  }
}

module.exports = User;
