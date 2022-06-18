import { EntityRepository, In, Repository } from "typeorm";
import Product from '../entities/product.entity';
import AppError from '../../../../shared/errors/AppError';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  async findByName(name: string) {
    return await this.findOne({
      where: {
         name,
      },
    })
  }

  async findAllByIds(products: IFindProducts[]) {
    const productsIds = products.map(product => product.id);

    const existProducts = await this.find({
      where: {
        id: In(productsIds),
      }
    })

    return existProducts;
  }
}