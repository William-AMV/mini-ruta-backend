import {inject} from "@adonisjs/core";
import AuthService from "#services/auth_service";
import {HttpContext} from "@adonisjs/core/http";
import EncryptionService from "#services/encryption_service";
import hash from "@adonisjs/core/services/hash";
import {RoleEnum} from "../patterns/role_enum.js";
import {GlobalApp} from "../patterns/global_app.js";

@inject()
export default class AuthController {
  constructor(
    protected authService: AuthService,
    protected encryptionService: EncryptionService
  ) {
  }

  public async verifyEmail({response, request}: HttpContext) {
    const emailDecrypt = this.encryptionService.decryptData(request.input('email'));
    const user = await this.authService.getUserEmailLogin(emailDecrypt);
    if (!user || user.role !== RoleEnum.ADMINISTRATOR)
      return response.status(500).json({success: false, message: 'The user does not exist or is not authorized'});

    return response.json({success: true, message: 'The user exists'});
  }

  public async login({request, response}: HttpContext) {
    const {email, password, isOperation} = request.only(['email', 'password', 'isOperation'])

    try {
      const emailDecrypt = this.encryptionService.decryptData(email);
      const passwordDecrypt = isOperation ? GlobalApp.$PASSWORD_DEFAULT : this.encryptionService.decryptData(password);

      const user = await this.authService.verifyEmailByLogin(emailDecrypt);
      if (user && await hash.verify(user.password, passwordDecrypt)) {
        const token = await this.authService.getToken(user, GlobalApp.$TOKEN_EXPIRES_LOGIN);

        return response.json({
          response: this.encryptionService.encryptDataObject({
            success: true,
            user: user,
            token: token,
            message: 'The user exists'
          })
        });
      }
      return response.status(500).json({success: false, message: 'The user does not exist or is not authorized'});
    } catch (error) {
      return response.status(500).json({success: false, message: `There was an error during sign in ${error}`});
    }
  }

  async authUser({auth}: HttpContext) {
    return {
      response: this.encryptionService.encryptDataObject({user: auth.user})
    }
  }

  async logout({auth, response}: HttpContext) {
    if (auth.user) {
      await this.authService.deleteToken(auth);
      return response.json({success: true, message: 'Good Bye!'});
    }
    return response.status(500).json({success: false, message: 'User not authenticated'});
  }
}