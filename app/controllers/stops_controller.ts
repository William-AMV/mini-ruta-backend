import type {HttpContext} from "@adonisjs/core/http";
import {inject} from "@adonisjs/core";
import StopService from "#services/stop_service";

@inject()
export default class StopsController {
  constructor(private stopService: StopService) {
  }

  async index({response, auth}: HttpContext) {
    const stops = await this.stopService.search(auth);

    return response.json(stops);
  }

  async store({request, response}: HttpContext) {
    const input = request.all();
    const result = await this.stopService.store(input);

    return response.json(result);
  }

  async update({params, request, response}: HttpContext) {
    const input = request.all();
    const result = await this.stopService.update(params.id, input);

    return response.json(result);
  }

  async destroy({params, response}: HttpContext) {
    const result = await this.stopService.delete(params.id)

    return response.json(result);
  }

}