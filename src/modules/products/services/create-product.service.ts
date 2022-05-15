import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/products.repository";

export interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {

  async execute(products: IProduct) {
    const productsRepository = getCustomRepository(ProductRepository)

    const productExist = await productsRepository.findByName(products.name)

    if (productExist) {
      throw new AppError("There is already one product with this name");
    }

    const product = productsRepository.create({
      name: products.name,
      price: products.price,
      quantity: products.quantity
    })
    return await productsRepository.save(product);
  }
}