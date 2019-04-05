const { Table } = require('typeorm');

module.exports = class CreateUserTable1554455103055 {
  // eslint-disable-next-line class-methods-use-this
  async up(queryRunner) {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar',
        },
      ],
    }));

    await queryRunner.createUniqueConstraint('user', {
      columnNames: ['email'],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async down(queryRunner) {
    await queryRunner.dropTable('user');
  }
};
