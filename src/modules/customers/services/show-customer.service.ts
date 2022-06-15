import { getCustomRepository } from "typeorm";
import { CustomerRepository } from '../typeorm/repository/custom.repository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  id: string;
}

export class ShowCustomerService {

  async execute({ id }: IRequest) {

    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findCustomerById(id);

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    return customer;

  }

}