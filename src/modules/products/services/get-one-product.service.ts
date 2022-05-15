import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { Repository } from "typeorm";
import { ProductRepository } from '../typeorm/repositories/products.repository';

interface IOneProduct {
  id: string
}

export class GetOneProdutService extends Repository<ProductRepository> {

  async execute({ id }: IOneProduct) {
    const productRepository = getCustomRepository(ProductRepository)

    const product =  await productRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}