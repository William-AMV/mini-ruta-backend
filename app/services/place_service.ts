import Place from "#models/place";
import {inject} from "@adonisjs/core";

@inject()
export default class PlaceService
{
  async search(auth: any) {
    return await Place.query().whereNot('id', auth.user.id).orderBy('id');
  }

  async store(input: Record<string, any>) {
    return await Place.create(input);
  }

  async update(id: number, input: Record<string, any>) {
    const place = await Place.findOrFail(id);
    place.merge(input);
    await place.save();
    return place;
  }

  async delete(id: number) {
    const place = await Place.findOrFail(id);
    place.isActive = !place.isActive;
    await place.save();
    return place;
  }  

}