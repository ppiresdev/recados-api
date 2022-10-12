import { Request, Response } from "express";
import { recoverDB } from "../../db/persistUser";

export class ListUsers {
  getAll(request: Request, response: Response) {
    const usersList = recoverDB();
    return response.status(200).json(usersList);
  }
}
