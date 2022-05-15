import { getCustomRepository } from "typeorm";
import { Repository } from "typeorm";
import { ProductRepository } from '../typeorm/repositories/products.repository';

export class GetProdutsService extends Repository<ProductRepository> {

  async execute() {
    const productRepository = getCustomRepository(ProductRepository)

    return await productRepository.find()
  }
}