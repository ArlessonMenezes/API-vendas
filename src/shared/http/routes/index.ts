import { Router } from 'express';
import productsRouter from '@modules/products/routes/product.routes';
import usersRouter from '@modules/users/routes/user.routes';
import sessionRouter from '@modules/users/routes/sessions.routes'

const routes = Router();

routes.use('/products', productsRouter)

routes.use('/users', usersRouter)

routes.use('/session', sessionRouter)

export default routes;