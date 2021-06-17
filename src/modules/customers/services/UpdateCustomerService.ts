import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Cliente não encontrado');
    }
    const customerExists = await customersRepository.findByEmail(email);
    if (customerExists && email != customer.email) {
      throw new AppError('Este e-mail já está sendo utilizado');
    }
    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);
    return customer;
  }
}
