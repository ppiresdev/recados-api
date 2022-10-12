import { Request, Response } from "express";
import { recoverDB } from "../../db/persistUser";

export class ListNotes {
  getAll(request: Request, response: Response) {
    const { userId } = request.params;
    const { status, content } = request.query;

    const userList = recoverDB();
    const userIndex = userList.findIndex((u) => u.id === userId);

    if (userIndex >= 0) {
      const notes = userList[userIndex].notes.filter((note) => {
        let filterStatus = true;
        let filterContent = true;

        if (content) {
          filterContent = note.content
            .toLowerCase()
            .includes(content.toString().toLowerCase());
        }

        if (status) {
          filterStatus = note.status === (status === "true" ? true : false);
        }
        return filterContent && filterStatus;
      });

      return response.status(200).json(notes);
    }

    // if (userIndex >= 0) {
    //   const notes = userList[userIndex].notes;
    //   return response.status(200).json(notes);
    // }
    return response.status(404).json("Usuário não encontrado!");
  }
}
