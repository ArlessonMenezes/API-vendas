import { getCustomRepository } from "typeorm";
import { CustomerRepository } from '../typeorm/repository/custom.repository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
}

export class CreateCustomerService {

  async execute({ name, email }: IRequest) {
    const customerRepository = getCustomRepository(CustomerRepository);

    const emailExist = await customerRepository.findCustomerByEamil(email);

    if (emailExist) {
      throw new AppError("Email address alread used.")
    }

    const customer = customerRepository.create({ name, email });
    await customerRepository.save(customer);

    return customer;
  }

}