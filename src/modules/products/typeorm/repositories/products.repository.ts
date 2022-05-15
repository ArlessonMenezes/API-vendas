import { EntityRepository, Repository } from "typeorm";
import Product from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  async findByName(name: string) {
    return await this.findOne({
      where: {
         name,
      },
    })
  }
}