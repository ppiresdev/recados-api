import { Request, Response } from "express";
import { recoverDB, storeDB, updateDB } from "../../db/persistUser";

export class DeleteNote {
  delete(request: Request, response: Response) {
    const { userId, noteId } = request.params;

    const userList = recoverDB();
    const userIndex = userList.findIndex((u) => u.id === userId);

    if (userIndex >= 0) {
      const notesList = userList[userIndex].notes;
      const noteIndex = notesList.findIndex((n) => n.id === noteId);
      if (noteIndex >= 0) {
        const user = userList[userIndex];
        notesList.splice(noteIndex, 1);
        user.updateNotesList(notesList);
        updateDB(userIndex, user);
        return response.status(200).json("Recado excluído com sucesso");
      }
      return response.status(404).json("Recado não encontrado!");
    }
    return response.status(404).json("Usuário não encontrado!");
  }
}
