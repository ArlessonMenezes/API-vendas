import { Router } from 'express';
import{ celebrate, Joi, Segments } from 'celebrate'
import { CustomerController } from '../controllers/customer.controller';
import isAuthenticated from '../../../shared/http/middlewares/is-authenticated';

const customerRouter = Router();

const customerController = new CustomerController()

customerRouter.use(isAuthenticated);

customerRouter.get('/', customerController.listCustomers)

customerRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    }
  }),
  customerController.showCustomer
)

customerRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }
  }),
  customerController.createCustomer
)

customerRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  customerController.updateCustomers
)

customerRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    }
  }),
  customerController.deleteCustomers
)

export default customerRouter;