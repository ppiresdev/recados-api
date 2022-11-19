import crypto from "crypto";
import { Note } from "./note";

export class User {
  private _id: string;
  get id() {
    return this._id;
  }

  private _email: string;
  get email() {
    return this._email;
  }

  private _password: string;
  get password() {
    return this._password;
  }

  private _notes!: Note[];
  get notes(): Note[] {
    return this._notes;
  }

  constructor(email: string, password: string) {
    this._id = crypto.randomUUID();
    this._email = email;
    this._password = password;
    //   this._notes = [];
  }

  static create(id: string, email: string, password: string): User {
    const user = new User(email, password);
    user._id = id;
    user._email = email;
    user._password = password;

    return user;
  }

  toJson() {
    return {
      id: this._id,
      email: this._email,
      //password: this._password,
      //notes: this._notes,
    };
  }

  // update(email: string, password: string) {
  //   this._email = email;
  //   this._password = password;
  // }

  // addNote(note: Note) {
  //   this._notes.push(note);
  // }

  // updateNotesList(noteList: Note[]) {
  //   this._notes = [...noteList];
  // }
}
