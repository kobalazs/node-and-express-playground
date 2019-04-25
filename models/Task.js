class Task {
  constructor(data) {
    if (data) {
      this.id = data.id;
      this.user_id = data.user_id;
      this.created_at = data.created_at || Date.now();
      this.fill(data);
    }
  }

  fill(data) {
    this.name = data.name;
    this.color = data.color;
    this.position = data.position || 0;
    this.is_done = data.is_done || false;
  }
}

module.exports = Task;
