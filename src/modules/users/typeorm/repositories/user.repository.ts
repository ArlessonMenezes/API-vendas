import { EntityRepository, Repository } from "typeorm";
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findUserByEmail(email: string) {
    const user = await this.findOne({
      where: {
        email
      }
    })

    return user
  }

  async findUserById(id: string) {
    const user = await this.findOne({
      where: {
        id
      }
    })

    return user
  }
}