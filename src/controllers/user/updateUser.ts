import { Request, Response } from "express";
import { recoverDB, updateDB } from "../../db/persistUser";

export class UpdateUser {
  update(request: Request, response: Response) {
    const { userId } = request.params;
    const { email, password } = request.body;

    const userList = recoverDB();
    const userIndex = userList.findIndex((u) => u.id === userId);
    if (userIndex >= 0) {
      const user = userList[userIndex];
      user.update(email, password);
      updateDB(userIndex, user);
      return response.status(200).json(user);
    }

    return response.status(404).json("Usuário não encontrado!");
  }
}
