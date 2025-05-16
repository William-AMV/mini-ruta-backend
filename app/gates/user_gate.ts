import {RoleEnum} from "../patterns/role_enum.js";

export default class UserGate {
  public static canAccessRole(user: any, role: RoleEnum) {
    return user.role === role;
  }
}
