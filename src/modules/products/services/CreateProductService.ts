import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('Já existe um produto cadastrado com esse nome', 400);
    }
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await this.productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
