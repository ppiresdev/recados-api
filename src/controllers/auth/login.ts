import { Request, Response } from "express";
import { storeUser } from "../../db/persistUser";

import { User } from "../../models/user";

export class CreateNewUser {
  createNewUser(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const newUser = new User(name, email, password);
    storeUser(newUser);

    return response.status(200).json(newUser.toString());
  }
}
