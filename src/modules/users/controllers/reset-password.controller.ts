import { Request, Response } from 'express';
import { ResetPasswprdService } from '../services/reset-password.service';

export class ResetPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordService = new ResetPasswprdService();

    await resetPasswordService.execute({
      token,
      password,
    });
    
    return response.status(204).json();
  }
}