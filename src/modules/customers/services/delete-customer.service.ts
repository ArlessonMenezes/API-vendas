import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/AppError';
import { CustomerRepository } from '../typeorm/repository/custom.repository';


interface IRequest {
  id: string;
}

export class DeleteCustomerService {

  async execute({ id }: IRequest) {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findCustomerById(id);

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    await customerRepository.remove(customer);
  }

}