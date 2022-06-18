import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import { CustomerRepository } from '../../customers/typeorm/repository/custom.repository';
import { ProductRepository } from '../../products/typeorm/repositories/products.repository';
import { Order } from '../typeorm/entities/order.entity';
import { OrdersRepository } from '../typeorm/entities/repositories/orders.repository';

interface IProduct {
  id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[]
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productsRepository = getCustomRepository(ProductRepository);
console.log(customer_id)
    const customerExists = await customerRepository.findCustomerById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }
 
    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInExistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInExistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInExistentProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;


