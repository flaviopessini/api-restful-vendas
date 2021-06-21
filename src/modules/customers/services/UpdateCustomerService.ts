import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Cliente não encontrado');
    }
    const customerExists = await this.customersRepository.findByEmail(email);
    if (customerExists && email != customer.email) {
      throw new AppError('Este e-mail já está sendo utilizado');
    }
    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);
    return customer;
  }
}
