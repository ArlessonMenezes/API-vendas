import { Router } from 'express';
import productsRouter from '@modules/products/routes/product.routes';
import usersRouter from '@modules/users/routes/user.routes';
import sessionRouter from '@modules/users/routes/sessions.routes'
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/session', sessionRouter);

routes.use('/password', passwordRouter);

routes.use('/profile', profileRouter);

export default routes;