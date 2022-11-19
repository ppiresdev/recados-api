import { Request, Response } from "express";
import { Note } from "../models/note";
import { NoteRepository } from "../repositories/note.repository";

export class NoteController {
  async findAllNotesByUser(request: Request, response: Response) {
    const { userId } = request.params;
    const { content, status } = request.query;
    // const { content, status } = request.body;

    const repository = new NoteRepository();

    try {
      const notes = await repository.getNotesByUser(
        userId,
        content as string,
        status as string
      );
      return response.status(200).json(notes.map((a) => a.toJson()));
    } catch (error) {
      return response.status(400).json("Credenciais inválidas");
    }
  }

  async saveNote(request: Request, response: Response) {
    const { userId } = request.params;
    const { content } = request.body;

    const repository = new NoteRepository();
    const note = new Note(content);
    try {
      await repository.saveNote(userId, note);
      return response.status(200).json(note.toJson());
    } catch (error) {
      return response.status(400).json("Ocorreu um erro");
    }
  }

  async updateNote(request: Request, response: Response) {
    const { noteId } = request.params;
    const { content, status } = request.body;

    const repository = new NoteRepository();

    try {
      const note = await repository.getNoteById(noteId);
      // console.log("Note", note);

      if (content) note.content = content;
      if (status || status === false) note.status = status;
      await repository.updateNote(note);
      return response.status(200).json(note);
    } catch (error) {
      return response.status(400).json("Ocorreu um erro");
    }
  }

  async deleteNote(request: Request, response: Response) {
    const { noteId } = request.params;
    const repository = new NoteRepository();

    try {
      await repository.removeNote(noteId);
      return response.status(200).json("Exclusão concluída");
    } catch (error) {
      return response.status(500).json("Exclusão não concluída");
    }
  }
}
