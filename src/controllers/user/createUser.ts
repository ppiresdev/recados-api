import { Request, Response } from "express";
import { storeUser, recoverDB } from "../../db/persistUser";

import { User } from "../../models/user";

export class CreateNewUser {
  createNewUser(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersList = recoverDB();
    const user = usersList.find(
      (user: User) => user.email === email.toLowerCase()
    );

    console.log("Email", email);

    if (user) {
      return response.status(201).json({ message: "E-mail já foi usado!" });
    }

    const newUser = new User(name, email, password);
    storeUser(newUser);

    return response.status(200).json(newUser.toString());
  }
}
