import { Request, Response } from "express";
import { CreateSessionService } from "../services/create-session.service";

export class SessionController {

  async createSession(req: Request, res:Response) {
    const { email, password } = req.body

    const createSessionService = new CreateSessionService()

    const session = await createSessionService.execute({ email, password })

    return res.json(session)
  }

}