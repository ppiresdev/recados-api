import { Request, Response } from "express";
import { recoverDB, updateDB } from "../../db/persistUser";
import { Note } from "../../models/note";

export class CreateNote {
  create(request: Request, response: Response) {
    const { userId } = request.params;
    const { content } = request.body;

    const userList = recoverDB();
    const userIndex = userList.findIndex((u) => u.id === userId);
    if (userIndex >= 0) {
      const newNote = new Note(content);
      const user = userList[userIndex];
      user.addNote(newNote);
      updateDB(userIndex, user);

      return response.status(200).json("Recado adicionado com sucesso!");
    }
    return response.status(404).json("Usuário não encontrado!");
  }
}
