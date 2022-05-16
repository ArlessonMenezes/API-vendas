import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { celebrate, Joi, Segments } from "celebrate";
import uploadConfig from '@config/upload';
import multer from 'multer';
import isAuthenticated from "../../../shared/http/middlewares/is-authenticated";
import { UserAvatarController } from '../controller/user-avatar.controller';

const usersRouter = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig)

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

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.updateAvatar
)


usersRouter.get('/', isAuthenticated, userController.getUsers)

export default usersRouter;
