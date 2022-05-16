import { Request, Response } from "express";
import { UpdateUserAvatarService } from "../services/user-avatar.service";

export class UserAvatarController {

  async updateAvatar(request: Request, response: Response): Promise<Response> {
    const avatarUpdate = new UpdateUserAvatarService()

    const createAvatar = await avatarUpdate.execute({
      id: request.user.id,
      avatar: String(request.file?.filename),
    })

    return response.json(createAvatar)
  }

}