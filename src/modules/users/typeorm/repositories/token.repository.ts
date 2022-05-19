import AppError from "@shared/errors/AppError";
import { EntityRepository, Repository } from "typeorm";
import { Token } from "../entities/Token";

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {

  async findByToken(token: string) {
    const userToken = await this.findOne({
      where: {
        token,
      }
    })

    if (!token) {
      throw new AppError("Token expired", 403)
    }

    return userToken
  }

  async generate(user_id: string) {
    const userToken = this.create({
      user_id,
    })

    await this.save(userToken)

    return userToken
  }
}