import { Request, Response } from "express";
import { UserEntity } from "../database/entities/user.entity";
import { pgHelper } from "../database/pg-helper";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repositoty";

export class UserController {
  async getAll(request: Request, response: Response) {
    const repository = new UserRepository();

    let users = await repository.findUsers();

    return response.json(users.map((u) => u.toJson()));
  }

  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const user = new User(email, password);
    const repository = new UserRepository();
    await repository.saveUser(user);
    // return response.json(user.toJson());
    return response.status(200).json("Usuário criado com sucesso");
  }

  async findUserByEmailAndPassword(
    request: Request,
    response: Response //: Promise<User | undefined>
  ) {
    const manager = pgHelper.client.manager;
    const { email, password } = request.body;
    const userEntity = await manager.findOne(UserEntity, {
      where: { email, password },
    });

    // if (!userEntity) return undefined;
    if (!userEntity)
      return response.status(404).json("Usuário não encontrado!");

    const user = User.create(
      userEntity.id,
      userEntity.email,
      userEntity.password
    );

    // return user;
    return response.status(200).json(user.id);
  }
}
