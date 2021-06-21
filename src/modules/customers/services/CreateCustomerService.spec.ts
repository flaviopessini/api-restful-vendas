import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import { v4 as uuidv4 } from 'uuid';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: `User ${uuidv4()}`,
      email: `${uuidv4()}@example.com`,
    });
    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create a customer with exists e-mail', async () => {
    await createCustomer.execute({
      name: 'Cliente #1',
      email: 'same_email@example.com',
    });
    const customer = async () =>
      await createCustomer.execute({
        name: 'Cliente #2',
        email: 'same_email@example.com',
      });
    expect(customer).rejects.toBeInstanceOf(AppError);
  });
});
