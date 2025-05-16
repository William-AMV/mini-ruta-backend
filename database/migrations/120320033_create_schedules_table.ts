import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'process.schedules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')  
      table.string('day', 150).nullable()
      table.string('hour', 150).nullable()  
      table.integer('mini_line_id').unsigned()
        .references('id')
        .inTable('mini_lines')
        .onDelete('CASCADE') 

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}