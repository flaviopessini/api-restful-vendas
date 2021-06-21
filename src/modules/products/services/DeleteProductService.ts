import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { injectable, inject } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Produto não encontrado', 400);
    }
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
