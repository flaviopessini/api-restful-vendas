import { Repository, EntityRepository, In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProduts {
  id: string;
}

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  }

  public async findAllByIds(products: IFindProduts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);
    const existsProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });
    return existsProducts;
  }
}
