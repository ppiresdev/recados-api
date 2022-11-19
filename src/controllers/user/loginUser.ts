import { Request, Response } from "express";
import { recoverDB, storeUser } from "../../db/persistUser";

import { User } from "../../models/user";

export class LoginUser {
  loginUser(request: Request, response: Response) {
    const { email, password } = request.body;

    const userList = recoverDB();

    setTimeout(() => {
      const userIndex = userList.findIndex(
        (u) => u.email.toLowerCase() === email && u.password === password
      );
      if (userIndex >= 0) {
        return response.status(200).json(userList[userIndex].id);
      }

      return response.status(404).json("Usuário não encontrado!");
    }, 3000);
  }
}
