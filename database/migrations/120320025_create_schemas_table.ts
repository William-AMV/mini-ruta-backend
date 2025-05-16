import { BaseSchema } from '@adonisjs/lucid/schema'
import db from "@adonisjs/lucid/services/db";

export default class extends BaseSchema {
  async up() {
    await db.rawQuery(`CREATE SCHEMA IF NOT EXISTS auth;`);
    await db.rawQuery(`CREATE SCHEMA IF NOT EXISTS process;`);
  }

  async down() {
    await db.rawQuery(`DROP SCHEMA IF EXISTS auth CASCADE;`);
    await db.rawQuery(`DROP SCHEMA IF EXISTS process CASCADE;`);
  }
}