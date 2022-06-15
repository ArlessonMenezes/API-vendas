import { Request, Response } from "express";
import { CreateCustomerService } from '../services/create-customer.service';
import { ListCustomerService } from "../services/list-customer.service";
import { ShowCustomerService } from '../services/show-customer.service';
import { UpdateCustomerService } from '../services/update-customer.service';
import { DeleteCustomerService } from '../services/delete-customer.service';

export class CustomerController {

  async createCustomer(req: Request, res: Response) {

    const { name, email } = req.body;

    const customerService = new CreateCustomerService()

    const customer = await customerService.execute({
      email,
      name,
    })

    return res.json(customer);
  };

  async showCustomer(req: Request, res: Response) {
    const { id } = req.params;

    const customerService = new ShowCustomerService()

    const customer = await customerService.execute({ id });

    return res.json(customer);
  }

  async listCustomers(req: Request, res: Response) {

    const customerService = new ListCustomerService()

    const customer = await customerService.execute();

    return res.json(customer);
  }

  async updateCustomers(req: Request, res: Response) {
    const { id } = req.params;
    const{ name, email } = req.body;

    const customerService = new UpdateCustomerService()

    const customer = await customerService.execute({
      id,
      name,
      email,
    });

    return res.json(customer);
  }

  async deleteCustomers(req: Request, res: Response) {
    const { id } = req.params;

    const customerService = new DeleteCustomerService()

    await customerService.execute({ id });

    return res.json([]);
  }

}