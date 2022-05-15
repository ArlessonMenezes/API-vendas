import { Request, Response } from 'express';
import { CreateUserService } from "../services/create-user.service";
import { GetUserService } from "../services/get-users.service";

export class UserController {

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body
    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    return res.json(user)
  }

  async getUsers(req: Request, res: Response) {
    const getUsers = new GetUserService()

    const users = await getUsers.execute()

    return res.json(users);
  }

}