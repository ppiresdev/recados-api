import crypto from "crypto";
import { Note } from "./note";

export class User {
  private _id: string;
  get id() {
    return this._id;
  }

  private _name: string;
  get name() {
    return this._name;
  }

  private _email: string;
  get email() {
    return this._email;
  }

  private _password: string;
  get password() {
    return this._password;
  }

  private _notes: Note[];
  get notes(): Note[] {
    return this._notes;
  }

  constructor(name: string, email: string, password: string) {
    this._id = crypto.randomUUID();
    this._name = name;
    this._email = email;
    this._password = password;
    this._notes = [];
  }

  toString() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      password: this._password,
      notes: this._notes,
    };
  }

  update(name: string, email: string, password: string) {
    this._name = name;
    this._email = email;
    this._password = password;
  }

  addNote(note: Note) {
    this._notes.push(note);
  }

  updateNotesList(noteList: Note[]) {
    this._notes = [...noteList];
  }
}
