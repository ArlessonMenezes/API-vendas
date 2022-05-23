import { Router } from "express";
import { SessionController } from "../controller/sessions.controller";
import { celebrate, Joi, Segments } from "celebrate";
import { ForgotPasswordController } from "../controller/forgot-password.controller";
import { ResetPasswordController } from '../controller/reset-password.controller';

const passwordRouter = Router()

const forgotPasswordController = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    }
  }),
  forgotPasswordController.create
)

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password'))
    }
  }),
  resetPassword.create
)
export default passwordRouter;