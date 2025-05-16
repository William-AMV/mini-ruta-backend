import User from "#models/user";
import Database from "@adonisjs/lucid/services/db";

export default class AuthService {
  async getToken(user: any, expiresIn: string) {
    await this.deleteTokensUser(user)
    return await User.accessTokens.create(user, ['*'], {expiresIn: expiresIn});
  }

  async getUserByEmail(emailDecrypt: string) {
    return await User.findBy('email', emailDecrypt);
  }

  async getUserEmailLogin(emailDecrypt: string) {
    return await User.query()
      .where('email', emailDecrypt)
      .where('is_active', true)
      .first();
  }

  async deleteToken(auth: any) {
    const user = await this.getUserByEmail(auth.user.email);
    await User.accessTokens.delete(user!, auth.user.currentAccessToken.identifier);
  }

  async deleteTokensUser(user: User) {
    await Database.from('auth_access_tokens').where('tokenable_id', user.id).delete();
  }

  async verifyEmailByLogin(emailDecrypt: string) {
    return this.getUserEmailLogin(emailDecrypt);
  }

}