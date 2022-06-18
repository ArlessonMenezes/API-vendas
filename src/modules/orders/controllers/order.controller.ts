import { Request, Response } from 'express';

import CreateOrderService from '../services/create-order.service';
import { ShowOrderService } from '../services/show-order.service';

export class OrderController {

  async show(res: Response, req: Request) {
    const { id } = req.params;

    const orderService = new ShowOrderService()

    const orderShow = await orderService.execute({ id })

    return res.json(orderShow);
  }


  async create(res: Response, req: Request) {
    const { customer_id, products } = req.body;

    const orderService = new CreateOrderService()

    const orderCreate = await orderService.execute({
      customer_id,
      products,
    })

    return res.json(orderCreate); 
  }

}