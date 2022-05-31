import { Request, Response } from "express";
import { ShowProfileService } from '../services/show-profile.service';
import { UpdateProfileService } from '../services/update-profile.service';

export class ProfileController {

  async show(req: Request, res: Response) {
    const user_id = req.user.id;

    const showProfileService = new ShowProfileService();

    const profile = await showProfileService.execute({ user_id });

    return res.json(profile);
  }

  async update(req: Request, res: Response) {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateProfieService = new UpdateProfileService();

    const profile = await updateProfieService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
     })

     return res.json(profile);
  }

}