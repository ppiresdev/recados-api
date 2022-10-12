import { Request, Response } from "express";
import { recoverDB, storeDB, updateDB } from "../../db/persistUser";

export class UpdateNote {
  update(request: Request, response: Response) {
    const { userId, noteId } = request.params;

    const { content, status } = request.body;

    const userList = recoverDB();
    const userIndex = userList.findIndex((u) => u.id === userId);

    if (userIndex >= 0) {
      const notesList = userList[userIndex].notes;
      const noteIndex = notesList.findIndex((n) => n.id === noteId);
      if (noteIndex >= 0) {
        const user = userList[userIndex];
        const note = notesList[noteIndex];

        if (status !== "" && content) {
          note.update(content, status);
        }

        if (status !== "" && !content) {
          note.updateStatus(status);
        }

        if (status !== "" && content) {
          note.updateContent(content);
        }

        notesList[noteIndex] = note;
        user.updateNotesList(notesList);
        updateDB(userIndex, user);
        return response.status(200).json("Recado atualizado com sucesso");
      }
      return response.status(404).json("Recado não encontrado!");
    }
    return response.status(404).json("Usuário não encontrado!");
  }
}
