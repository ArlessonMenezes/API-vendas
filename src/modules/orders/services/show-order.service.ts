import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import { OrdersRepository } from '../typeorm/entities/repositories/orders.repository';

interface IRequest {
  id: string;
}

export class ShowOrderService {

  async execute({ id }: IRequest) {

    const ordersRepository = getCustomRepository(OrdersRepository)

    const order = await ordersRepository.findById(id)

    if (!order) {
      throw new AppError("Order not found.")
    }

    return order;
  }
}
