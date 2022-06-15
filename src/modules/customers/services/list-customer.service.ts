import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repository/custom.repository';
export class ListCustomerService {

  async execute() {

    const customerRepository = getCustomRepository(CustomerRepository);

    const customers = await customerRepository.find()

    return customers;
  }

}