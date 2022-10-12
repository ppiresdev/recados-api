import { Request, Response, NextFunction } from "express";
import { recoverDB } from "../db/persistUser";
import { User } from "../models/user";

export class ValidateEmailWasUsedMiddleware {
  ValidateEmailWasUsed(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { email } = request.body;
    const usersList = recoverDB();
    const user = usersList.find((user: User) => user.email === email);
    console.log(usersList);

    console.log(email);

    if (user) {
      return response.status(400).json({ message: "E-mail já foi usado!" });
    }
    return next();
  }
}
