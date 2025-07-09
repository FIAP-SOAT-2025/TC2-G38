import { PrismaService } from '../../shared/infra/prisma.service';
import { CreateInternalUserDto } from '../domain/dto/createInternalUser.dto';
import { InternalUser } from '../domain/model/internalUser.entity';
import { RoleType } from '../domain/model/role-type';
import { PrismaInternalUserRepository } from '../infra/adapters/out/repository/prismaInternalUser.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('PrismaInternalUserRepository', () => {
  let prismaService: jest.Mocked<PrismaService>;
  let prismaInternalUserRepository: PrismaInternalUserRepository;
  const mockDate = new Date('2025-05-10T01:47:30.199Z');
  beforeEach(async () => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaInternalUserRepository,
        {
          provide: PrismaService,
          useValue: {
            internalUser: {
              create: jest.fn(),
              findByCpf: jest.fn(),
              findUnique: jest.fn(),
              findRoleId: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    prismaInternalUserRepository = module.get<PrismaInternalUserRepository>(
      PrismaInternalUserRepository,
    );
    prismaService = module.get(PrismaService);
  });

  it('should create an internal user successfully', async () => {
    const createInternalUserDto: CreateInternalUserDto = {
      registrationNumber: 'STAFF-001',
      name: 'user teste',
      cpf: '12345678901',
      email: 'teste@teste.com',
      password: '12342331234233',
      roleName: RoleType.ADMIN,
    };

    const userToCreate = {
      registrationNumber: createInternalUserDto.registrationNumber,
      name: createInternalUserDto.name,
      cpf: createInternalUserDto.cpf,
      email: createInternalUserDto.email,
      password: createInternalUserDto.password,
      roleId: 'role-id',
    };

    const created = new InternalUser({
      id: '345',
      createdAt: mockDate,
      updatedAt: mockDate,
      ...userToCreate,
    });
    (prismaService.internalUser.create as jest.Mock).mockResolvedValue(created);
    const result = await prismaInternalUserRepository.create(created);

    expect(result.toJSON()).toEqual(created.toJSON());
    expect(prismaService.internalUser.create).toHaveBeenCalledWith({
      data: userToCreate,
    });
  });

  it('should throw an error if user already exists', async () => {
    const createInternalUserDto: CreateInternalUserDto = {
      registrationNumber: 'STAFF-001',
      name: 'user teste',
      cpf: '12345678901',
      email: 'teste@teste.com',
      password: '12342331234233',
      roleName: RoleType.STAFF,
    };

    (prismaService.internalUser.create as jest.Mock).mockRejectedValue(
      new Error('Failed to create InternalUser'),
    );

    await expect(
      prismaInternalUserRepository.create(
        new InternalUser({ ...createInternalUserDto, roleId: '123' }),
      ),
    ).rejects.toThrow('Failed to create InternalUser');
  });

  it('should return true if user is found by CPF', async () => {
    const findUser = new InternalUser({
      id: '345',
      registrationNumber: 'STAFF-001',
      name: 'user teste',
      cpf: '12345678901',
      email: 'teste@teste.com',
      password: '12342331234233',
      roleId: 'role-id',
      createdAt: mockDate,
      updatedAt: mockDate,
    });

    (prismaService.internalUser.findUnique as jest.Mock).mockResolvedValue(
      findUser,
    );
    const result = await prismaInternalUserRepository.findByCpf(findUser.cpf);
    expect(result).toBe(true);
    expect(prismaService.internalUser.findUnique).toHaveBeenCalledWith({
      where: {
        cpf: findUser.cpf,
      },
    });
    expect(prismaService.internalUser.findUnique).toHaveBeenCalledTimes(1);
  });
  it('should return false if user is not found by CPF', async () => {
    const _cpf = '12345678901';
    (prismaService.internalUser.findUnique as jest.Mock).mockResolvedValue(
      null,
    );
    const result = await prismaInternalUserRepository.findByCpf(_cpf);
    expect(result).toBe(false);
    expect(prismaService.internalUser.findUnique).toHaveBeenCalledWith({
      where: {
        cpf: _cpf,
      },
    });
    expect(prismaService.internalUser.findUnique).toHaveBeenCalledTimes(1);
  });
});
