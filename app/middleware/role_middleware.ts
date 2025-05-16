import type { HttpContext } from '@adonisjs/core/http'
import UserGate from "../gates/user_gate.js";
import {RoleEnum} from "../patterns/role_enum.js";

export default class RoleMiddleware {
  public async handle({ auth, response }: HttpContext, next: () => Promise<void>, roles: RoleEnum[]) {
    const user = await auth.use('api').authenticate();

    const hasRole = roles.some(role => UserGate.canAccessRole(user, role));
    if (!hasRole) {
      return response.forbidden({ message: 'Access denied: You are not authorized to perform this action.' });
    }

    await next();
  }
}