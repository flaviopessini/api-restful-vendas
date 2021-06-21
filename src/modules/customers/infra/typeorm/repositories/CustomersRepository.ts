import { Repository, EntityRepository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
  public async findById(id: string): Promise<Customer | undefined> {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.findOne({
      where: {
        email: email,
      },
    });
  }
}
