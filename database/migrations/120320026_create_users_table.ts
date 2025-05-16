import {BaseSchema} from '@adonisjs/lucid/schema'
import {RoleEnumArray} from "../../app/patterns/role_enum.js";

export default class extends BaseSchema {
  protected tableName= 'auth.users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name', 150).nullable()
      table.string('email', 200).notNullable().unique()
      table.string('password').notNullable()
      table.enu('role', RoleEnumArray).notNullable()
      table.boolean('is_active').defaultTo(true)

      
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}