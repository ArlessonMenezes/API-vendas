import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../typeorm/repository/custom.repository';
import AppError from '../../../shared/errors/AppError';
import { Customer } from '../typeorm/entities/customer.entity';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export class UpdateCustomerService {

  async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findCustomerById(id);

    if (!customer) {
      throw new AppError("Customer not found.");
    }

    const customerEmail = await customerRepository.findCustomerByEamil(email);

    if (customerEmail && email !== customer.email) {
      throw new AppError("There is already one customer with this email")
    }

    customer.name = name;
    customer.email = email;
    
    await customerRepository.save(customer)

    return customer;
  }

}