import crypto from "crypto";

export class Note {
  private _id: string;
  get id() {
    return this._id;
  }
  private _content: string;
  get content() {
    return this._content;
  }
  private _status: boolean;
  get status() {
    return this._status;
  }

  constructor(content: string) {
    this._id = crypto.randomUUID();
    this._content = content;
    this._status = true;
  }

  update(content: string, status: boolean) {
    this._content = content;
    this._status = status;
  }

  updateStatus(status: boolean) {
    this._status = status;
  }

  updateContent(content: string) {
    this._content = content;
  }
}
