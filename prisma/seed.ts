import {
  PrismaClient,
  ItemCategory,
  OrderStatus,
  PaymentType,
  PaymentStatus,
  RoleType,
} from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Limpar banco de dados (opcional, mas útil para desenvolvimento)
  await cleanDatabase();

  // Criar roles
  const adminRole = await prisma.role.create({
    data: {
      id: randomUUID(),
      type: RoleType.ADMIN,
      description: 'Administrador do sistema com acesso total',
    },
  });

  const staffRole = await prisma.role.create({
    data: {
      id: randomUUID(),
      type: RoleType.STAFF,
      description: 'Funcionário com acesso limitado ao sistema',
    },
  });

  // Criar usuários internos
  const adminUser = await prisma.internalUser.create({
    data: {
      registrationNumber: 'ADMIN-001',
      name: 'Admin Principal',
      cpf: '12345678900',
      email: 'admin@restaurante.com',
      password: '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', // hash de "admin123"
      roleId: adminRole.id, // Ensure adminRole.id exists
    },
  });

  const staffUser1 = await prisma.internalUser.create({
    data: {
      registrationNumber: 'STAFF-001',
      name: 'João Silva',
      cpf: '23456789001',
      email: 'joao@restaurante.com',
      password: '$2a$10$AkQbLj.a9W8CLlJrZgCPLOxjpFOfqkCCJ3E/cIyYUuCoNcJiA3UXK', // hash de "staff123"
      roleId: staffRole.id, // Ensure staffRole.id exists
    },
  });

  const staffUser2 = await prisma.internalUser.create({
    data: {
      registrationNumber: 'STAFF-002',
      name: 'Maria Oliveira',
      cpf: '34567890102',
      email: 'maria@restaurante.com',
      password: '$2a$10$AkQbLj.a9W8CLlJrZgCPLOxjpFOfqkCCJ3E/cIyYUuCoNcJiA3UXK', // hash de "staff123"
      roleId: staffRole.id, // Ensure staffRole.id exists
    },
  });

  // Criar itens do cardápio
  const hamburger = await prisma.item.create({
    data: {
      name: 'X-Burger Especial',
      description:
        'Hambúrguer artesanal com queijo, alface, tomate e molho especial',
      images: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
      price: 22.9,
      quantity: 100,
      category: ItemCategory.SANDWICH,
    },
  });

  const cheeseburger = await prisma.item.create({
    data: {
      name: 'X-Salada Duplo',
      description:
        'Dois hambúrgueres artesanais, queijo cheddar, alface, tomate e cebola caramelizada',
      images: [
        'https://placehold.co/600x400',
        'https://placehold.co/600x400',
        'https://placehold.co/600x400',
      ],
      price: 29.9,
      quantity: 100,
      category: ItemCategory.SANDWICH,
    },
  });

  const veggieburger = await prisma.item.create({
    data: {
      name: 'Veggie Burger',
      description:
        'Hambúrguer vegetariano com queijo, alface, tomate e molho especial',
      images: [
        'https://placehold.co/600x400',
        'https://placehold.co/600x400',
        'https://placehold.co/600x400',
      ],
      price: 24.9,
      quantity: 50,
      category: ItemCategory.SANDWICH,
    },
  });

  const frenchFries = await prisma.item.create({
    data: {
      name: 'Batata Frita Grande',
      description: 'Porção grande de batatas fritas crocantes',
      images: ['https://placehold.co/600x400'],
      price: 18.9,
      quantity: 200,
      category: ItemCategory.SIDE,
    },
  });

  const onionRings = await prisma.item.create({
    data: {
      name: 'Anéis de Cebola',
      description: 'Anéis de cebola empanados e fritos',
      images: ['https://placehold.co/600x400'],
      price: 15.9,
      quantity: 150,
      category: ItemCategory.SIDE,
    },
  });

  const cola = await prisma.item.create({
    data: {
      name: 'Refrigerante Cola 500ml',
      description: 'Refrigerante tipo cola gelado',
      images: ['https://placehold.co/600x400'],
      price: 7.9,
      quantity: 300,
      category: ItemCategory.BEVERAGE,
    },
  });

  const juice = await prisma.item.create({
    data: {
      name: 'Suco Natural de Laranja 300ml',
      description: 'Suco de laranja 100% natural',
      images: ['https://placehold.co/600x400'],
      price: 9.9,
      quantity: 100,
      category: ItemCategory.BEVERAGE,
    },
  });

  const iceCream = await prisma.item.create({
    data: {
      name: 'Sorvete de Chocolate',
      description: 'Sorvete cremoso de chocolate com calda',
      images: ['https://placehold.co/600x400'],
      price: 12.9,
      quantity: 80,
      category: ItemCategory.DESSERT,
    },
  });

  const brownie = await prisma.item.create({
    data: {
      name: 'Brownie com Sorvete',
      description: 'Brownie quente com sorvete de baunilha',
      images: ['https://placehold.co/600x400'],
      price: 16.9,
      quantity: 60,
      category: ItemCategory.DESSERT,
    },
  });

  // Criar clientes
  const customer1 = await prisma.customer.create({
    data: {
      name: 'Ana Souza',
      cpf: '45678901234',
      email: 'ana.souza@email.com',
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Carlos Mendes',
      cpf: '56789012345',
      email: 'carlos.mendes@email.com',
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      name: 'Beatriz Lima',
      cpf: '67890123456',
      email: 'beatriz.lima@email.com',
    },
  });

  // Criar pedidos com pagamentos
  // Pedido 1
  const order1 = await prisma.order.create({
    data: {
      status: OrderStatus.COMPLETED,
      totalAmount: 59.7,
      customerId: customer1.id,
    },
  });

  const payment1 = await prisma.payment.create({
    data: {
      status: PaymentStatus.APPROVED,
      type: PaymentType.PIX,
      orderId: order1.id,
      qrCode: "00020126580014br.gov.bcb.pix0136b76aa9c2-2ec4-4110-954e-ebfe34f05b615204000053039865406157.205802BR5925DIkGwOMywWUXuWnQWchGHFiZE6009Sao Paulo62230519mpqrinter1340016447630411F6",
      mercadoPagoPaymentId: "1340016447",
    },
  });

  // Atualizar o orderId do payment1
  await prisma.payment.update({
    where: { id: payment1.id },
    data: { orderId: order1.id },
  });

  // Adicionar itens ao pedido 1
  await prisma.orderItem.create({
    data: {
      itemId: hamburger.id,
      orderId: order1.id,
      quantity: 1,
      price: 22.9,
    },
  });

  await prisma.orderItem.create({
    data: {
      itemId: frenchFries.id,
      orderId: order1.id,
      quantity: 1,
      price: 18.9,
    },
  });

  await prisma.orderItem.create({
    data: {
      itemId: cola.id,
      orderId: order1.id,
      quantity: 1,
      price: 7.9,
    },
  });

  await prisma.orderItem.create({
    data: {
      itemId: iceCream.id,
      orderId: order1.id,
      quantity: 1,
      price: 10.0,
    },
  });

  // Pedido 2
  const order2 = await prisma.order.create({
    data: {
      status: OrderStatus.READY,
      totalAmount: 74.7,
      customerId: customer2.id,
    },
  });

  const payment2 = await prisma.payment.create({
    data: {
      status: PaymentStatus.APPROVED,
      type: PaymentType.PIX,
      orderId: order2.id,
      qrCode: "00020126580014br.gov.bcb.pix0136b76aa9c2-2ec4-4110-954e-ebfe34f05b615204000053039865406157.205802BR5925DIkGwOMywWUXuWnQWchGHFiZE6009Sao Paulo62230519mpqrinter1340016447630411F6",
      mercadoPagoPaymentId: "1340016447",
    },
  });

  // Atualizar o orderId do payment2
  await prisma.payment.update({
    where: { id: payment2.id },
    data: { orderId: order2.id },
  });

  // Adicionar itens ao pedido 2
  await prisma.orderItem.create({
    data: {
      itemId: cheeseburger.id,
      orderId: order2.id,
      quantity: 2,
      price: 59.8,
    },
  });

  await prisma.orderItem.create({
    data: {
      itemId: juice.id,
      orderId: order2.id,
      quantity: 1,
      price: 9.9,
    },
  });

  await prisma.orderItem.create({
    data: {
      itemId: onionRings.id,
      orderId: order2.id,
      quantity: 1,
      price: 5.0,
    },
  });

  // Pedido 3
  const order3 = await prisma.order.create({
    data: {
      status: OrderStatus.RECEIVED,
      totalAmount: 41.8,
      customerId: customer3.id,
    },
  });

  const payment3 = await prisma.payment.create({
    data: {
      status: PaymentStatus.APPROVED,
      type: PaymentType.PIX,
      orderId: order3.id,
      qrCode: "00020126580014br.gov.bcb.pix0136b76aa9c2-2ec4-4110-954e-ebfe34f05b615204000053039865406157.205802BR5925DIkGwOMywWUXuWnQWchGHFiZE6009Sao Paulo62230519mpqrinter1340016447630411F6",
      mercadoPagoPaymentId: "1340016447",
    },
  });

  // Atualizar o orderId do payment3
  await prisma.payment.update({
    where: { id: payment3.id },
    data: { orderId: order3.id },
  });

  // Adicionar itens ao pedido 3
  await prisma.orderItem.create({
    data: {
      itemId: veggieburger.id,
      orderId: order3.id,
      quantity: 1,
      price: 24.9,
    },
  });

  await prisma.orderItem.create({
    data: {
      itemId: juice.id,
      orderId: order3.id,
      quantity: 1,
      price: 9.9,
    },
  });

  await prisma.orderItem.create({
    data: {
      itemId: brownie.id,
      orderId: order3.id,
      quantity: 1,
      price: 7.0,
    },
  });

  console.log('Seed executado com sucesso!');
}

// Função para limpar o banco antes de inserir novos dados
async function cleanDatabase() {
  // A ordem é importante devido às chaves estrangeiras
  await prisma.payment.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.internalUser.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.order.deleteMany({});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
