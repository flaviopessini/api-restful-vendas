import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Cliente não encontrado');
    }
    await this.customersRepository.remove(customer);
  }
}
