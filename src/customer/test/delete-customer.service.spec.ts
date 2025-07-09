import { Test, TestingModule } from '@nestjs/testing';
import CustomerRepository from '../domain/repository/customer.repository';
import DeleteCustomerService from '../application/services/delete-customer.service';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundException } from '@nestjs/common';

describe('DeleteCustomerService', () => {
  let service: DeleteCustomerService;
  let repository: jest.Mocked<CustomerRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCustomerService,
        {
          provide: 'CustomerRepository',
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DeleteCustomerService>(DeleteCustomerService);
    repository = module.get('CustomerRepository');
  });

  it('should deleted an customer successfully', async () => {
    const id = '1c6d63e4-7b48-4d42-8a70-08f374fb712c';
    repository.delete.mockResolvedValue(undefined as void);
    const result = await service.delete(id);
    expect(repository.delete).toHaveBeenCalledWith(id);
    expect(result).toBeUndefined();
  });

  it('should throw NotFoundException when customer not found', async () => {
    const id = '1c6d63e4-7b48-4d42-8a70-08f374fb712c';
    repository.delete.mockImplementationOnce(() => {
      throw new NotFoundException();
    });
    await expect(service.delete(id)).rejects.toThrow(NotFoundException);
  });
});
