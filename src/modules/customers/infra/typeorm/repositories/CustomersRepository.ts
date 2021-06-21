import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findAll(): Promise<ICustomer[] | undefined> {
    const customers = await this.ormRepository.find();
    return customers;
  }

  public async findAllPaginate(): Promise<ICustomerPaginate> {
    const customers = await this.ormRepository.createQueryBuilder().paginate();
    return customers as ICustomerPaginate;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return await this.ormRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    return await this.ormRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return await this.ormRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });
    return await this.ormRepository.save(customer);
  }

  public async save(customer: ICustomer): Promise<Customer> {
    return await this.ormRepository.save(customer);
  }

  public async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }
}
