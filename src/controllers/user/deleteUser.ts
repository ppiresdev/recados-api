import { Request, Response } from "express";
import { recoverDB, storeDB, updateDB } from "../../db/persistUser";

export class DeleteUser {
  delete(request: Request, response: Response) {
    const { userId } = request.params;

    const userList = recoverDB();
    const userIndex = userList.findIndex((u) => u.id === userId);

    if (userIndex >= 0) {
      userList.splice(userIndex, 1);
      storeDB(userList);
      return response.status(200).json("Usuário excluído com sucesso");
    }

    return response.status(404).json("Usuário não encontrado!");
  }
}
