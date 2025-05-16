import {DateTime} from 'luxon'
import {BaseModel, column} from "@adonisjs/lucid/orm";

export default class Stop extends BaseModel {
  static table: string = 'process.places';

  @column({isPrimary: true})
  declare id: number

  @column()
  declare name: string

  @column()
  declare linkPlace: string | null

  @column()
  declare isActive: boolean

  @column.dateTime({autoCreate: true, serializeAs: null})
  declare createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: null})
  declare updatedAt: DateTime 
}