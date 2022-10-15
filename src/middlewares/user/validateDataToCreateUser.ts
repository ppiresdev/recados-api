import { Request, Response, NextFunction } from "express";

export class ValidateDataToCreateUserMiddleware {
  ValidateData(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "E-mail e senha são obrigaórios." });
    }
    return next();
  }
}
