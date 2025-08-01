# 🍔 Sistema de Controle de Pedidos

> **Tech Challenge FIAP - Fase 02 | Grupo  147**

----

## 📋 Sumário

- [Objetivo](#-objetivo)
- [Funcionalidades](#-funcionalidades)
- [Documentação](#-documentação)
- [Tecnologias](#️-tecnologias)
- [Arquitetura](#️-arquitetura)
- [Linguagem Ubíqua](#-linguagem-ubíqua)
- [Desenho de requisitos do negócio](#️-requisitos-negócio)
- [Desenho da infraestrutura](#️-requisitos-infra)
- [Configuração](#️-configuração)
- [Execução](#️-execução)
- [Order de Execução](#️-ordem-execução)
- [Testes](#-testes)
- [Equipe](#-equipe---grupo-38)

---

## 🎯 Objetivo

Desenvolver um monolito para gerenciamento de pedidos de uma lanchonete, implementando as melhores práticas de desenvolvimento de software com clean architecture e práticas de Domain Driven Design (DDD).

---

## 🚀 Funcionalidades

### Gestão de Clientes (Customer)
- ✅ Cadastro e identificação por CPF
- ✅ Gerenciamento de dados do cliente

### Gestão de Itens
- ✅ CRUD completo de itens
- ✅ Busca por categoria (Sandwich, Beverage, Side, Dessert)
- ✅ Controle de estoque básico, subtraindo a quantidade de item assim que  um Pedido é realizado

### Gestão de Pedidos (Order)
- ✅ Criação de pedidos
- ✅ Controle de status do pedido com ordenação
- ✅ Listagem de pedidos

### Sistema de Pagamento
- ✅ Integração com API de pagamento via QrCode com PIX do Mercado Pago
- ✅ Webhook: Controle de status de pagamento mockado.

---

## 📚 Documentação

| Recurso | Link |
|---------|------|
| **Swagger** | [Swagger UI](http://localhost:3000/api) |
| **Collection postman com exemplos de request** | [Collection Postman](https://drive.google.com/file/d/1ALtt8pY6O2XU1QKhaXTSMhZzP-9B-K7_/view?usp=sharing) |
| **Documentação da Api** | [Payloads e Curl](./api-documentation.md) |
| **Event Storming** | [Miro Board](https://miro.com/app/board/uXjVIFyKlHg=/) |
| **Variáveis de Ambiente** |  [ Google Docs ](https://docs.google.com/document/d/1VSRjj57Eax54N8XnDkh8X8qgpX06bfv8/edit#heading=h.7ahxszoxwf2) |
| **Vídeo de demonstração da API** |  [ Google Drive - TODO ](TODO) |

### 

---

## 🛠️ Tecnologias

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| **Linguagem** | TypeScript | 4.1.3 |
| **Framework** | NestJS | 10.8.2 |
| **Runtime** | Node.js | 22.0.0 |
| **ORM** | Prisma | 6.8.2 |
| **Banco de Dados** | PostgreSQL |  14.18  |
| **Containerização** | Docker & Docker Compose | Latest |

---

## 🏗️ Arquitetura
O sistema foi desenvolvido seguindo a *arquitetura limpa*, com uma estrutura modular composta por: *Order, Item, Customer, InternalUser e Payments*. Cada um desses módulos está organizado em camadas principais:

- Controller: Camada responsável por receber as requisições externas (HTTP, por exemplo), orquestrar a entrada dos dados e encaminhá-los para os casos de uso apropriados.

- Domain: Contém as entidades centrais do domínio, Essa camada representa a regra de negócio pura e está isolada de detalhes de infraestrutura, promovendo baixo acoplamento e alta coesão.

- UseCases: Implementa os casos de uso da aplicação, coordenando as entidades e serviços necessários para atender as regras de negócio. É a ponte entre a entrada de dados (Controller) e as regras de domínio.

- Gateways: Implementa as interfaces de saída , como acesso a banco de dados, serviços externos, promovendo a inversão de dependência.

- Infrastructure: Contém as configurações e implementações concretas de tecnologias utilizadas, como clientes HTTP, repositórios com ORM, bancos de dados .

- Presenter: Responsável por formatar a saída dos dados para os consumidores, separando a lógica de apresentação da lógica de negócio.


### Princípios Arquiteturais
- **Clean Architecture** 
- **Domain Driven Design** (DDD)

---

## 📖 Linguagem Ubíqua

### Entidades Principais

| Termo | Definição |
|-------|-----------|
| **Order** | Conjunto de itens escolhidos pelo cliente, com status rastreável |
| **Item** | Produto individual disponível no cardápio |
| **Customer** | Cliente que realiza pedidos (identificação opcional) |
| **InternalUser** | Funcionário da lanchonete |

### Status e Categorias

#### OrderStatus
- `RECEIVED` - Pedido pago e recebido pela cozinha
- `PREPARING` - Cozinha preparando o pedido
- `READY` - Pedido pronto para retirada do cliente
- `COMPLETED` - Pedido entregue ao cliente

#### ItemCategory
- `SANDWICH` - Sanduíches
- `BEVERAGE` - Bebidas
- `SIDE` - Acompanhamentos
- `DESSERT` - Sobremesas

#### PaymentStatus
- `APPROVED` - Pagamento aprovado
- `PENDING` - Aguardando processamento
- `REFUSED` - Pagamento recusado
- `EXPIRED` - Pagamento expirado
- `CANCELLED` - Pagamento cancelado

#### RoleType
- `ADMIN` - Administrador do sistema
- `STAFF` - Funcionário operacional

---

## Desenho de requisitos do negócio

![Descrição da imagem](/desenho-arch.jpg)


## Desenho da infraestrutura

![Descrição da imagem](/desenho-infra.png)


## Pré-requisitos

- **Docker** e **Docker Compose** instalados ([Guia de instalação](https://docs.docker.com/get-started/get-docker/))
- **Git** para clonar o repositório

## ⚙️ Configuração
### Clonar Repositório do projeto
```bash
# 1. Clonar o repositório
git clone https://github.com/FIAP-SOAT-2025/TC2-G38.git
cd TC2-G38
```
### Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

Popular as seguintes variáveis do arquivo `.env` para utilizar setup local:

```env
DATABASE_URL=
DB_USER=
DB_PASSWORD= 
DB_NAME= 
API_BASE_URL=
ACCESS_TOKEN= 


```
### IMPORTANTE!
A env ACCESS_TOKEN é de necessária para a conexão com a API do Mercado Pago, e seu valor estará no [Drive do Projeto](https://docs.google.com/document/d/1VSRjj57Eax54N8XnDkh8X8qgpX06bfv8/edit#heading=h.57tg4az9s2oq)
```env
ACCESS_TOKEN = 
```

## Opção 1: Setup Completo com Docker (Recomendado)

```bash
# 1. Subir todos os serviços
docker-compose up
```

## Opção 2: Setup Local (Desenvolvimento)

```bash
# 1.Instalar dependências
npm install

# 3. Subir apenas o banco de dados
docker-compose up db -d
```

---



### Setup do Banco de Dados

```bash
# Executar migrações e popular dados iniciais
npx prisma migrate dev --name init
npm run seed
```

---

## ▶️ Execução

### Desenvolvimento
```bash
npm run start:dev
```

### Acesso à Aplicação
- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api

--- 

## Order de Execução

- Internal User
- Item
- Customer
- Order
- Webhook Payment
- Patch de Status da Order

---

## 🧪 Testes

```bash
# Executar todos os testes
npm run test
```

---

## 👥 Equipe - Grupo 38

| Nome | RM |
|------|-----|
| **Daniela Rêgo Lima de Queiroz** | RM361289 |
| **Diana Bianca Santos Rodrigues** | RM361570 |
| **Felipe Alves Teixeira** | RM362585 |
| **Luiz Manoel Resplande Oliveira** | RM363920 |
| **Thaís Lima de Oliveira Nobre** | RM362744 |

---

## 📝 Licença

Este projeto foi desenvolvido como parte do Tech Challenge da FIAP - Pós-graduação em Software Architecture.

---

<div align="center">
  <strong>🍔 Desenvolvido com dedicação pelo Grupo 38 🍔 </strong>
</div>
