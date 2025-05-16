import type {HttpContext} from "@adonisjs/core/http";
import {inject} from "@adonisjs/core";
import PlaceService from "#services/place_service";

@inject()
export default class PlacesController {
  constructor(private placeService: PlaceService) {
  }

  async index({response, auth}: HttpContext) {
    const places = await this.placeService.search(auth);

    return response.json(places);
  }

  async store({request, response}: HttpContext) {
    const input = request.all();
    const result = await this.placeService.store(input);

    return response.json(result);
  }

  async update({params, request, response}: HttpContext) {
    const input = request.all();
    const result = await this.placeService.update(params.id, input);

    return response.json(result);
  }

  async destroy({params, response}: HttpContext) {
    const result = await this.placeService.delete(params.id)

    return response.json(result);
  }

}