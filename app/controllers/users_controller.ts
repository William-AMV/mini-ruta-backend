import type {HttpContext} from "@adonisjs/core/http";
import {inject} from "@adonisjs/core";
import UserService from "#services/user_service";
import {createUserValidator, updateUserValidator} from "#validators/user";

@inject()
export default class UsersController {
  constructor(private userService: UserService) {
  }

  async index({response, auth}: HttpContext) {
    const users = await this.userService.search(auth);

    return response.json(users);
  }

  async store({request, response}: HttpContext) {
    const input = request.all();
    const inputValidators = await createUserValidator.validate(input)
    const result = await this.userService.store(inputValidators);

    return response.json(result);
  }

  async update({params, request, response}: HttpContext) {
    const input = request.all();
    const inputValidators = await updateUserValidator(params.id).validate(input)
    const result = await this.userService.update(params.id, inputValidators);

    return response.json(result);
  }

  async destroy({params, response}: HttpContext) {
    const result = await this.userService.delete(params.id)

    return response.json(result);
  }

}