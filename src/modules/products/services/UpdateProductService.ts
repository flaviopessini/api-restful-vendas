import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';
interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Produto não encontrado', 400);
    }
    const productExists = await productRepository.findByName(name);
    if (productExists) {
      throw new AppError('Já existe um produto cadastrado com esse nome', 400);
    }
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
