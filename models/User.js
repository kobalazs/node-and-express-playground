class User {
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
    }
  }
}

module.exports = User;
