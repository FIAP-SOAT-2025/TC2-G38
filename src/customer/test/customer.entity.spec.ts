import { Customer, CustomerInterface, Cpf, Email } from '../entities/customer.entity';

describe('Customer Entity', () => {
  describe('Customer Class', () => {
    const validCustomerData: CustomerInterface = {
      id: '1',
      name: 'João Silva',
      cpf: '12345678901',
      email: 'joao@email.com',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    };

    describe('Constructor', () => {
      it('should create a customer with valid data', () => {
        const customer = new Customer(validCustomerData);

        expect(customer.id).toBe('1');
        expect(customer.name).toBe('João Silva');
        expect(customer.cpf).toBe('12345678901');
        expect(customer.email).toBe('joao@email.com');
        expect(customer.createdAt).toEqual(new Date('2023-01-01'));
        expect(customer.updatedAt).toEqual(new Date('2023-01-01'));
      });

      it('should create a customer without id, createdAt and updatedAt', () => {
        const customerData = {
          name: 'Maria Santos',
          cpf: '98765432100',
          email: 'maria@email.com',
        };

        const customer = new Customer(customerData);

        expect(customer.id).toBe('undefined');
        expect(customer.name).toBe('Maria Santos');
        expect(customer.cpf).toBe('98765432100');
        expect(customer.email).toBe('maria@email.com');
        expect(customer.createdAt).toBeInstanceOf(Date);
        expect(customer.updatedAt).toBeInstanceOf(Date);
      });

      it('should throw error when name is empty', () => {
        const invalidData = {
          ...validCustomerData,
          name: '',
        };

        expect(() => new Customer(invalidData)).toThrow('Name cannot be empty');
      });

      it('should throw error when name is only spaces', () => {
        const invalidData = {
          ...validCustomerData,
          name: '   ',
        };

        expect(() => new Customer(invalidData)).toThrow('Name cannot be empty');
      });

      it('should throw error when CPF is invalid', () => {
        const invalidData = {
          ...validCustomerData,
          cpf: '123',
        };

        expect(() => new Customer(invalidData)).toThrow('Invalid CPF');
      });

      it('should throw error when email is invalid', () => {
        const invalidData = {
          ...validCustomerData,
          email: 'invalid-email',
        };

        expect(() => new Customer(invalidData)).toThrow('Invalid Email');
      });
    });

    describe('Getters', () => {
      let customer: Customer;

      beforeEach(() => {
        customer = new Customer(validCustomerData);
      });

      it('should return correct id', () => {
        expect(customer.id).toBe('1');
      });

      it('should return correct name', () => {
        expect(customer.name).toBe('João Silva');
      });

      it('should return correct cpf', () => {
        expect(customer.cpf).toBe('12345678901');
      });

      it('should return correct email', () => {
        expect(customer.email).toBe('joao@email.com');
      });

      it('should return correct createdAt', () => {
        expect(customer.createdAt).toEqual(new Date('2023-01-01'));
      });

      it('should return correct updatedAt', () => {
        expect(customer.updatedAt).toEqual(new Date('2023-01-01'));
      });
    });

    describe('Setters', () => {
      let customer: Customer;

      beforeEach(() => {
        customer = new Customer(validCustomerData);
      });

      it('should set name correctly', () => {
        customer.name = 'Novo Nome';
        expect(customer.name).toBe('Novo Nome');
      });

      it('should set cpf correctly', () => {
        customer.cpf = '11122233344';
        expect(customer.cpf).toBe('11122233344');
      });

      it('should throw error when setting invalid cpf', () => {
        expect(() => {
          customer.cpf = '123';
        }).toThrow('Invalid CPF');
      });

      it('should set email correctly', () => {
        customer.email = 'NOVO@EMAIL.COM';
        expect(customer.email).toBe('novo@email.com');
      });

      it('should throw error when setting invalid email', () => {
        expect(() => {
          customer.email = 'invalid-email';
        }).toThrow('Invalid Email');
      });

      it('should set createdAt correctly', () => {
        const newDate = new Date('2024-01-01');
        customer.createdAt = newDate;
        expect(customer.createdAt).toEqual(newDate);
      });

      it('should set updatedAt correctly', () => {
        const newDate = new Date('2024-01-01');
        customer.updatedAt = newDate;
        expect(customer.updatedAt).toEqual(newDate);
      });
    });

    describe('toJSON', () => {
      it('should return correct JSON representation', () => {
        const customer = new Customer(validCustomerData);
        const json = customer.toJSON();

        expect(json).toEqual({
          id: '1',
          name: 'João Silva',
          cpf: '12345678901',
          email: 'joao@email.com',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        });
      });

      it('should return JSON with current state after modifications', () => {
        const customer = new Customer(validCustomerData);
        customer.name = 'Nome Alterado';
        customer.email = 'alterado@email.com';

        const json = customer.toJSON();

        expect(json.name).toBe('Nome Alterado');
        expect(json.email).toBe('alterado@email.com');
      });
    });
  });

  describe('Cpf Class', () => {
    describe('Constructor', () => {
      it('should create a valid CPF', () => {
        const cpf = new Cpf('12345678901');
        expect(cpf.getCpf()).toBe('12345678901');
      });

      it('should remove non-numeric characters from CPF', () => {
        const cpf = new Cpf('123.456.789-01');
        expect(cpf.getCpf()).toBe('12345678901');
      });

      it('should throw error for invalid CPF length', () => {
        expect(() => new Cpf('123')).toThrow('Invalid CPF');
      });

      it('should throw error for empty CPF', () => {
        expect(() => new Cpf('')).toThrow('Invalid CPF');
      });
    });

    describe('isValid static method', () => {
      it('should return true for valid CPF length', () => {
        expect(Cpf.isValid('12345678901')).toBe(true);
      });

      it('should return false for invalid CPF length', () => {
        expect(Cpf.isValid('123')).toBe(false);
        expect(Cpf.isValid('123456789012')).toBe(false);
        expect(Cpf.isValid('')).toBe(false);
      });
    });

    describe('getCpf method', () => {
      it('should return the CPF value', () => {
        const cpf = new Cpf('12345678901');
        expect(cpf.getCpf()).toBe('12345678901');
      });
    });

    describe('onlyNumbers private method', () => {
      it('should remove all non-numeric characters', () => {
        const cpf = new Cpf('123.456.789-01');
        expect(cpf.getCpf()).toBe('12345678901');
      });

      it('should handle CPF with spaces and special characters', () => {
        const cpf = new Cpf(' 123 456 789 01 ');
        expect(cpf.getCpf()).toBe('12345678901');
      });

      it('should handle CPF with letters and numbers', () => {
        const cpf = new Cpf('abc123def456ghi789jkl01mno');
        expect(cpf.getCpf()).toBe('12345678901');
      });
    });
  });

  describe('Email Class', () => {
    describe('Constructor', () => {
      it('should create a valid email', () => {
        const email = new Email('test@email.com');
        expect(email.getEmail()).toBe('test@email.com');
      });

      it('should convert email to lowercase', () => {
        const email = new Email('TEST@EMAIL.COM');
        expect(email.getEmail()).toBe('test@email.com');
      });

      it('should throw error for invalid email format', () => {
        expect(() => new Email('invalid-email')).toThrow('Invalid Email');
        expect(() => new Email('test@')).toThrow('Invalid Email');
        expect(() => new Email('@email.com')).toThrow('Invalid Email');
        expect(() => new Email('test@email')).toThrow('Invalid Email');
        expect(() => new Email('')).toThrow('Invalid Email');
      });
    });

    describe('isValid static method', () => {
      it('should return true for valid email formats', () => {
        expect(Email.isValid('test@email.com')).toBe(true);
        expect(Email.isValid('user.name@domain.com')).toBe(true);
        expect(Email.isValid('user+tag@domain.co.uk')).toBe(true);
        expect(Email.isValid('123@456.789')).toBe(true);
      });

      it('should return false for invalid email formats', () => {
        expect(Email.isValid('invalid-email')).toBe(false);
        expect(Email.isValid('test@')).toBe(false);
        expect(Email.isValid('@email.com')).toBe(false);
        expect(Email.isValid('test@email')).toBe(false);
        expect(Email.isValid('')).toBe(false);
        expect(Email.isValid('test email@domain.com')).toBe(false);
        expect(Email.isValid('test@email .com')).toBe(false);
      });
    });

    describe('getEmail method', () => {
      it('should return the email value', () => {
        const email = new Email('test@email.com');
        expect(email.getEmail()).toBe('test@email.com');
      });

      it('should return lowercase email', () => {
        const email = new Email('TEST@EMAIL.COM');
        expect(email.getEmail()).toBe('test@email.com');
      });
    });
  });
});
