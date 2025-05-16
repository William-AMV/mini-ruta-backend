import {BaseSchema} from '@adonisjs/lucid/schema'
import { LineEnumArray } from '../../app/patterns/line_enum.js';
import { BackgroundEnumArray } from '../../app/patterns/background_enum.js';

export default class extends BaseSchema {
  protected tableName= 'process.mini_lines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.enu('line', LineEnumArray).nullable()
      table.string('link_path', 255).notNullable().unique()
      table.enu('background', BackgroundEnumArray).notNullable()
      table.boolean('is_active').defaultTo(true)
      table.string('frequency', 250).nullable()
      table.integer('user_id').unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE') 

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}