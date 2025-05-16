import vine from '@vinejs/vine'
import {Database} from "@adonisjs/lucid/database";

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().email().regex(/^[^@]+@gmail\.com$/).unique(async (db: Database, value: string) => {
      const user = await db
        .from('auth.users')
        .where('email', value)
        .first()
      return !user
    }),
    role: vine.string().trim(),
    isActive: vine.boolean(),
  })
);

export const updateUserValidator = (id: number) => vine.compile(
  vine.object({
    id: vine.number().withoutDecimals(),
    fullName: vine.string().trim(),
    email: vine.string().email().regex(/^[^@]+@gmail\.com$/).unique(async (db: Database, value: string) => {
      const user = await db
        .from('auth.users')
        .whereNot('id', id)
        .where('email', value)
        .first()
      return !user
    }),
    role: vine.string().trim(),
    isActive: vine.boolean(),
  })
);