import customerRouter from '@modules/customers/routes/customers.routes';
import productsRouter from '@modules/products/routes/product.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';
import usersRouter from '@modules/users/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/session', sessionRouter);

routes.use('/password', passwordRouter);

routes.use('/profile', profileRouter);

routes.use('/customers', customerRouter);

export default routes;