import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'process.mini_trips'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')    
      table.integer('mini_line_id').unsigned()
        .references('id')
        .inTable('mini_lines')
        .onDelete('CASCADE') 
      table.integer('place_id').unsigned()
        .notNullable()
        .references('id')
        .inTable('places')
        .onDelete('CASCADE')   

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}