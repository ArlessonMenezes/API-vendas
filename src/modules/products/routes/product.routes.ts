import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import{ celebrate, Joi, Segments } from 'celebrate'

const productsRouter = Router();

const productController = new ProductController()

productsRouter.get('/', productController.getAllProducts)

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    }
  }),
  productController.getOneProduct
)

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productController.createProduct
)

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    },
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }),
  productController.updateProduct
)

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    }
  }),
  productController.deleteProduct
)

export default productsRouter