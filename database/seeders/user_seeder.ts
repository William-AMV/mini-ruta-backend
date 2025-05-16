import { BaseSeeder } from "@adonisjs/lucid/seeders";
import User from "#models/user";
import { RoleEnum } from "../../app/patterns/role_enum.js";

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        fullName: "Admin",
        email: "admin@gmail.com",
        password: "Sys#QuotatioN*202#!",
        role: RoleEnum.ADMINISTRATOR,
        isActive: true
      }
    ]);
  }  
}

