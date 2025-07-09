import { Test, TestingModule } from '@nestjs/testing';
import { InternalUserController } from '../infra/adapters/in/controller/internalUser.controller';
import { InternalUserService } from 'src/user/application/services/internalUser.service';
import { CreateInternalUserDto } from 'src/user/domain/dto/createInternalUser.dto';
import { InternalUser } from 'src/user/domain/model/internalUser.entity';
import { RoleType } from '../domain/model/role-type';

describe('InternalUserController', () => {
  let controller: InternalUserController;
  let service: InternalUserService;
  const mockDate = new Date('2025-05-10T01:47:30.199Z');

  beforeEach(async () => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalUserController],
      providers: [
        {
          provide: InternalUserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InternalUserController>(InternalUserController);
    service = module.get<InternalUserService>(InternalUserService);
  });

  describe('createUser', () => {
    it('Should create an internal user successfully', async () => {
      const createDto: CreateInternalUserDto = {
        registrationNumber: 'STAFF-001',
        name: 'Daniela Teste',
        cpf: '12345678901',
        email: 'teste@teste.com',
        password: 'password123',
        roleName: RoleType.ADMIN,
      };

      const createdUser = new InternalUser({
        ...createDto,
        createdAt: mockDate,
        updatedAt: mockDate,
        id: '123',
        roleId: 'role-123',
        password: 'hashed_password',
      });

      (service.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await controller.createUser(createDto);
      expect(result).toEqual(createdUser);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });
});
