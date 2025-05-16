import Stop from "#models/place";
import {inject} from "@adonisjs/core";

@inject()
export default class StopService
{
  async search(auth: any) {
    return await Stop.query().whereNot('id', auth.user.id).orderBy('id');
  }

  async store(input: Record<string, any>) {
    return await Stop.create(input);
  }

  async update(id: number, input: Record<string, any>) {
    const stop = await Stop.findOrFail(id);
    stop.merge(input);
    await stop.save();
    return stop;
  }

  async delete(id: number) {
    const stop = await Stop.findOrFail(id);
    stop.isActive = !stop.isActive;
    await stop.save();
    return stop;
  }  

}