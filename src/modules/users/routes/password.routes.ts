import { Router } from "express";
import { SessionController } from "../controller/sessions.controller";
import { celebrate, Joi, Segments } from "celebrate";
import { ForgotPasswordController } from "../controller/forgot-password.controller";

const passwordRouter = Router()

const forgotPasswordController = new ForgotPasswordController()

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    }
  }),
  forgotPasswordController.create
)

export default passwordRouter;