import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);
    const productExists = await productRepository.findByName(name);
    if (productExists) {
      throw new AppError('Já existe um produto cadastrado com esse nome', 400);
    }
    const product = productRepository.create({
      name,
      price,
      quantity,
    });
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productRepository.save(product);
    return product;
  }
}

export default CreateProductService;
