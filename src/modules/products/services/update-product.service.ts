import { getCustomRepository, Repository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/products.repository';
import AppError from '@shared/errors/AppError';
import { STATUS_CODES } from 'http';
import { json } from 'stream/consumers';
import { Http2ServerRequest } from 'http2';

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductProdutService extends Repository<ProductRepository> {

  async execute(data: IProduct) {
    const productRepository = getCustomRepository(ProductRepository)

    const product = await productRepository.findOne({
      where: {
        id: data.id
      }
     })

     if (!product) {
      throw new AppError("Product not found");
    }

    const productExist =  await productRepository.findByName(data.name)

    if (productExist && data.name !== product.name) {
      throw new AppError("There is already one product with this name");
    }

    await productRepository.update(product.id, {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    })

    return product
  }
}