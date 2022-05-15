import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { celebrate, Joi, Segments } from "celebrate";

const usersRouter = Router()
const userController = new UserController()

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  userController.createUser
)

usersRouter.get('/', userController.getUsers)

export default usersRouter;
