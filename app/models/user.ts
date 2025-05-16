import {DateTime} from 'luxon'
import hash from '@adonisjs/core/services/hash'
import {compose} from '@adonisjs/core/helpers'
import {BaseModel, column} from "@adonisjs/lucid/orm";
import {withAuthFinder} from '@adonisjs/auth/mixins/lucid'
import {DbAccessTokensProvider} from '@adonisjs/auth/access_tokens'
import {RoleEnum} from "../patterns/role_enum.js";

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static table: string = 'auth.users';

  @column({isPrimary: true})
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({serializeAs: null})
  declare password: string

  @column()
  declare role: RoleEnum;

  @column()
  declare isActive: boolean

  @column.dateTime({autoCreate: true, serializeAs: null})
  declare createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true, serializeAs: null})
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    table: 'auth.auth_access_tokens',
  });  
}