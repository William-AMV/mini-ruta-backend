import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'process.comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content') 
      table.datetime('date_published').defaultTo(this.now()).notNullable()  
      table.integer('score').notNullable(),
      table.string('passenger_agent', 250).nullable()
      table.string('passenger_ip', 50).nullable()            
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