import { Request, Response } from "express";
import { recoverDB } from "../../db/persistUser";

export class GetNote {
  getNote(request: Request, response: Response) {
    const { userId, noteId } = request.params;

    const userList = recoverDB();
    const userIndex = userList.findIndex((u) => u.id === userId);

    if (userIndex >= 0) {
      const notesList = userList[userIndex].notes;
      const note = notesList.find((n) => n.id === noteId);
      if (note) {
        return response.status(200).json(note);
      }
      return response.status(404).json("Recado não encontrado!");
    }
    return response.status(404).json("Usuário não encontrado!");
  }
}
