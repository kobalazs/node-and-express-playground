const { Table, TableForeignKey } = require('typeorm');

module.exports = class CreateTasksTable1554734113238 {
  // eslint-disable-next-line class-methods-use-this
  async up(queryRunner) {
    await queryRunner.createTable(new Table({
      name: 'task',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'user_id',
          type: 'integer',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'color',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'position',
          type: 'integer',
          default: 0,
        },
        {
          name: 'is_done',
          type: 'boolean',
          default: false,
        },
        {
          name: 'created_at',
          type: 'timestamp',
        },
      ],
    }));

    await queryRunner.createForeignKey('task', new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  async down(queryRunner) {
    const table = await queryRunner.getTable('task');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
    await queryRunner.dropForeignKey('user', foreignKey);
    await queryRunner.dropTable('task');
  }
};
