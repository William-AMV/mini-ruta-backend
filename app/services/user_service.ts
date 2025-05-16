import User from "#models/user";
import {GlobalApp} from "../patterns/global_app.js";
import {inject} from "@adonisjs/core";

@inject()
export default class UserService
{
  async search(auth: any) {
    return await User.query().whereNot('id', auth.user.id).orderBy('id');
  }

  async store(input: Record<string, any>) {
    input.password = GlobalApp.$PASSWORD_DEFAULT;
    return await User.create(input);
  }

  async update(id: number, input: Record<string, any>) {
    const user = await User.findOrFail(id);
    user.merge(input);
    await user.save();
    return user;
  }

  async delete(id: number) {
    const user = await User.findOrFail(id);
    user.isActive = !user.isActive;
    await user.save();
    return user;
  }  

}