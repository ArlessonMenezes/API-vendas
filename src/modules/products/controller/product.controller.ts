import { json, Request, Response } from "express";
import { GetOneProdutService } from "../services/get-one-product.service";
import { GetProdutsService } from "../services/get-products.service";
import CreateProductService from '../services/create-product.service';
import { UpdateProductProdutService } from "../services/update-product.service";
import { RemoveProdutService } from "../services/remove-product.service";

export default class ProductController {

  async getAllProducts(req: Request, res: Response) {
    const listPrpducts = new GetProdutsService()

    const products = await listPrpducts.execute()

    return res.json(products)
  }

  async getOneProduct(req: Request, res: Response) {
    const { id } = req.params;

    const getOneProduct = new GetOneProdutService()

    const product = await getOneProduct.execute({ id })

    return res.json(product)
  }

  async createProduct(req: Request, res: Response) {
    const { name, price, quantity } = req.body

    const createProduct = new CreateProductService()

    const product = await createProduct.execute({
      name,
      price,
      quantity
    })

    return res.json(product)
  }

  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const updateProduct = new UpdateProductProdutService()

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    })
    console.log(product)
    return res.json(product)
  }

  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;

    const deleteProduct = new RemoveProdutService()

    await deleteProduct.execute({ id })

    return res.json([])
  }
}



