module.exports = class AddUniqueContstraintToTasksTable1556177387628 {
  // eslint-disable-next-line class-methods-use-this
  async up(queryRunner) {
    await queryRunner.createUniqueConstraint('task', {
      columnNames: ['user_id', 'name'],
    });
  }

  // eslint-disable-next-line
  async down(queryRunner) {
    //
  }
};
