import { Router } from "express";
import { SessionController } from "../controller/sessions.controller";
import { celebrate, Joi, Segments } from "celebrate";

const sessionRouter = Router()

const sessionCotroller = new SessionController()

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  sessionCotroller.createSession
  )

export default sessionRouter;