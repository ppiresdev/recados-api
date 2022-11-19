import { UserEntity } from "../database/entities/user.entity";
import { pgHelper } from "../database/pg-helper";
import { User } from "../models/user";

export class UserRepository {
  async findUsers(): Promise<User[]> {
    const manager = pgHelper.client.manager;
    const usersEntities = await manager.find(UserEntity);

    return usersEntities.map((row) => {
      return User.create(row.id, row.email, row.password);
    });
  }

  async verifyUserExistsByEmail(email: string): Promise<boolean> {
    const manager = pgHelper.client.manager;
    const userEntity = await manager.findOneBy(UserEntity, { email });
    return !!userEntity;
  }

  async saveUser(user: User): Promise<void> {
    const manager = pgHelper.client.manager;

    const userEntity = manager.create(UserEntity, {
      id: user.id,
      email: user.email,
      password: user.password,
    });

    await manager.save(userEntity);
  }
}
