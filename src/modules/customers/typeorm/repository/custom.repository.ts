import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {

  async findCustomerById(id: string) {
    return await this.findOne({
      where: {
        id,
      }
     })
  }

  async findCustomerByName(name: string) {
    return await this.findOne({
      where: {
        name,
      }
     })
  }

  async findCustomerByEamil(email: string) {
    return await this.findOne({
      where: {
        email,
      }
     })
  }

}