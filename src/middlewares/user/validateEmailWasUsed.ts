import { Request, Response, NextFunction } from "express";
import { recoverDB } from "../../db/persistUser";
import { User } from "../../models/user";
import { UserRepository } from "../../repositories/user.repositoty";

export class ValidateEmailWasUsedMiddleware {
  async validateEmailWasUsed(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { email } = request.body;
    // const usersList = recoverDB();
    // const user = usersList.find((user: User) => user.email === email);
    const repository = new UserRepository();
    const userExists = await repository.verifyUserExistsByEmail(email);

    if (userExists) {
      return response.status(400).json("E-mail já está em uso");
    }
    return next();
  }
}
