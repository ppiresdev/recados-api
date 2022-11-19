import { FindOperator, ILike } from "typeorm";
import { NoteEntity } from "../database/entities/note.entity";
import { UserEntity } from "../database/entities/user.entity";
import { pgHelper } from "../database/pg-helper";
import { Note } from "../models/note";

export class NoteRepository {
  async getNotesByUser(
    userId: string,
    content?: string,
    status?: string
  ): Promise<Note[]> {
    const manager = pgHelper.client.manager;

    let whereConditions: {
      userId: string;
      content?: FindOperator<string>;
      status?: boolean;
    } = { userId };

    if (status) {
      whereConditions = {
        ...whereConditions,
        status: status === "true" ? true : false,
      };
    }

    if (content) {
      whereConditions = {
        ...whereConditions,
        content: ILike(`%${content}%`),
      };
    }
    const notesEntities = await manager.find(NoteEntity, {
      where: whereConditions,
    });

    return notesEntities.map((e) => Note.create(e.id, e.content, e.status));
  }

  // async saveNote(userId: string, content: string) {
  async saveNote(userId: string, note: Note) {
    const manager = pgHelper.client.manager;

    const userEntity = await manager.findOne(UserEntity, {
      where: { id: userId },
    });

    if (!userEntity) throw new Error("Usuário não encontrado");

    const noteEntity = manager.create(NoteEntity, {
      id: note.id,
      content: note.content,
      userId,
    });

    await manager.save(noteEntity);
  }

  async getNoteById(noteId: string) {
    const manager = pgHelper.client.manager;

    const noteEntity = await manager.findOne(NoteEntity, {
      where: { id: noteId },
    });

    if (!noteEntity) throw new Error("Recado não encontrado");
    return noteEntity;
  }

  async updateNote(note: NoteEntity) {
    const manager = pgHelper.client.manager;
    await manager.save(note);
  }

  async removeNote(noteId: string) {
    const manager = pgHelper.client.manager;

    const noteEntity = await manager.findOneBy(NoteEntity, { id: noteId });

    if (!noteEntity) throw Error("Recado não encontrado");
    await manager.delete(NoteEntity, { id: noteId });
  }
}
