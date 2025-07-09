import { InternalUserService } from 'src/user/application/services/internalUser.service';
import { InternalUserRepositoryInterface } from 'src/user/domain/repository/internalUser.repository';
import { CreateInternalUserDto } from 'src/user/domain/dto/createInternalUser.dto';
import { InternalUser } from 'src/user/domain/model/internalUser.entity';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleType } from '../domain/model/role-type';

describe('InternalUserService', () => {
  let service: InternalUserService;
  let repository: jest.Mocked<InternalUserRepositoryInterface>;
  const mockDate = new Date('2025-05-10T01:47:30.199Z');
  beforeEach(async () => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InternalUserService,
        {
          provide: 'InternalUserRepository',
          useValue: {
            create: jest.fn(),
            findByCpf: jest.fn(),
            findByCpfOrEmailOrRegistrationNumber: jest.fn(),
            findRoleId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InternalUserService>(InternalUserService);
    repository = module.get('InternalUserRepository');
  });

  it('should create an internal user successfully', async () => {
    const dto: CreateInternalUserDto = {
      registrationNumber: 'STAFF-001',
      name: 'nome user Teste',
      cpf: '12345678901',
      email: 'teste@teste.com',
      password: 'senha123',
      roleName: RoleType.ADMIN,
    };

    repository.findByCpfOrEmailOrRegistrationNumber.mockResolvedValue(false);
    repository.findRoleId.mockResolvedValue('role-123');

    const hashedPassword = Buffer.from(dto.password, 'utf-8').toString(
      'base64',
    );

    const mockUser = new InternalUser({
      ...dto,
      roleId: 'role-123',
      password: hashedPassword,
      createdAt: mockDate,
      updatedAt: mockDate,
    });

    repository.create.mockResolvedValue(mockUser);

    const result = await service.create(dto);

    expect(
      repository.findByCpfOrEmailOrRegistrationNumber,
    ).toHaveBeenCalledWith(dto.cpf, dto.email, dto.registrationNumber);
    expect(
      repository.findByCpfOrEmailOrRegistrationNumber,
    ).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(mockUser);
    expect(result).toBeInstanceOf(InternalUser);
    expect(result).toHaveProperty('id');
    expect(result).toBe(mockUser);
  });

  it('should throw BadRequestException if the InternalUser is already registered', async () => {
    const dto: CreateInternalUserDto = {
      registrationNumber: 'STAFF-001',
      name: 'Daniela Teste',
      cpf: '12345678901',
      email: 'teste@teste.com',
      password: 'senha123',
      roleName: RoleType.ADMIN,
    };

    repository.findByCpfOrEmailOrRegistrationNumber.mockResolvedValue(true);

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    expect(
      repository.findByCpfOrEmailOrRegistrationNumber,
    ).toHaveBeenCalledWith(dto.cpf, dto.email, dto.registrationNumber);
    expect(repository.create).not.toHaveBeenCalled();
  });
});
