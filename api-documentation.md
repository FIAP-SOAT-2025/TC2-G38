# API Endpoints

## Summary

| Resource       | Method | Endpoint                                | Description                |
|----------------|--------|-----------------------------------------|----------------------------|
| Item           | POST   | `/item`                                 | Create a new item          |
| Item           | PATCH  | `/item/:id`                             | Update an item             |
| Item           | GET    | `/item/:id`                             | Get item by ID             |
| Item           | GET    | `/item/category/:categoryEnum`          | Get items by category      |
| Item           | DELETE | `/item/:id`                             | Delete an item             |
| Customer       | POST   | `/customer`                             | Create a new customer      |
| Customer       | PATCH  | `/customer/:id`                         | Update a customer          |
| Customer       | DELETE | `/customer/:id`                         | Delete a customer          |
| Customer       | GET    | `/customer/:cpf`                        | Get customer by CPF        |
| Internal User  | POST   | `/internal-user/create`                 | Create an internal user    |
| Order          | POST   | `/order`                                | Create a new order         |
| Order          | GET    | `/order/:id`                            | Get order by ID            |
| Order          | GET    | `/order`                                | Get all orders             |
| Order          | PATCH  | `/order/:id/status`                     | Update Order Status        |
| Payment        | PATCH  | `/payment/:id/status`                   | Update payment status      |

---

## Item

### Create Item
- **POST** `/item`
- **Payload:**
  ```json
  {
    "name": "Coke",
    "description": "Coke zero",
    "images": ["https://placehold.co/600x400"],
    "price": 10.5,
    "quantity": 100,
    "category": "BEVERAGE"
  }
  ```
- **cURL:**
  ```bash
  curl -X POST http://localhost:3000/item \
    -H "Content-Type: application/json" \
    -d '{"name":"Coke","description":"Coke zero","images":["https://placehold.co/600x400"],"price":10.5,"quantity":100,"category":"BEVERAGE"}'
  ```

### Update Item
- **PATCH** `/item/:id`
- **Payload (partial allowed):**
  ```json
  {
    "name": "Coke Zero",
    "price": 11.0
  }
  ```
- **cURL:**
  ```bash
  curl -X PATCH http://localhost:3000/item/<id> \
    -H "Content-Type: application/json" \
    -d '{"name":"Coke Zero","price":11.0}'
  ```

### Get Item by ID
- **GET** `/item/:id`
- **cURL:**
  ```bash
  curl http://localhost:3000/item/<id>
  ```

### Get Items by Category
- **GET** `/item/category/:categoryEnum`
- **cURL:**
  ```bash
  curl http://localhost:3000/item/category/BEVERAGE
  ```

### Delete Item
- **DELETE** `/item/:id`
- **cURL:**
  ```bash
  curl -X DELETE http://localhost:3000/item/<id>
  ```

---

## Customer

### Create Customer
- **POST** `/customer`
- **Payload:**
  ```json
  {
    "name": "John Doe",
    "cpf": "094.112.850-40",
    "email": "john@example.com"
  }
  ```
- **cURL:**
  ```bash
  curl -X POST http://localhost:3000/customer \
    -H "Content-Type: application/json" \
    -d '{"name":"John Doe","cpf":"094.112.850-40","email":"john@example.com"}'
  ```

### Update Customer
- **PATCH** `/customer/:id`
- **Payload:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```
- **cURL:**
  ```bash
  curl -X PATCH http://localhost:3000/customer/<id> \
    -H "Content-Type: application/json" \
    -d '{"name":"Jane Doe","email":"jane@example.com"}'
  ```

### Delete Customer
- **DELETE** `/customer/:id`
- **cURL:**
  ```bash
  curl -X DELETE http://localhost:3000/customer/<id>
  ```

### Get Customer by CPF
- **GET** `/customer/:cpf`
- **cURL:**
  ```bash
  curl http://localhost:3000/customer/:cpf
  ```

---

## Internal User

### Create Internal User
- **POST** `/internal-user/create`
- **Payload:**
  ```json
  {
    "registrationNumber": "12345",
    "name": "Employee Name",
    "cpf": "094.112.850-40",
    "email": "employee@example.com",
    "password": "StrongPassword123!",
    "roleName": "ADMIN"
  }
  ```
- **cURL:**
  ```bash
  curl -X POST http://localhost:3000/internal-user/create \
    -H "Content-Type: application/json" \
    -d '{"registrationNumber":"12345","name":"Employee Name","cpf":"094.112.850-40","email":"employee@example.com","password":"StrongPassword123!","roleName":"ADMIN"}'
  ```

---

## Order

### Create Order
- **POST** `/order`
- **Payload:**
  ```json
  {
    "customerCpf": "12345678901",
    "orderItems": [
      { "itemId": "id1", "itemQuantity": 2 },
      { "itemId": "id2", "itemQuantity": 1 }
    ]
  }
  ```
- **cURL:**
  ```bash
  curl -X POST http://localhost:3000/order \
    -H "Content-Type: application/json" \
    -d '{"customerCpf":"12345678901","orderItems":[{"itemId":"id1","itemQuantity":2},{"itemId":"id2","itemQuantity":1}]}'
  ```

### Get Order by ID
- **GET** `/order/:id`
- **cURL:**
  ```bash
  curl http://localhost:3000/order/<id>
  ```

### Get All Orders
- **GET** `/order`
- **cURL:**
  ```bash
  curl http://localhost:3000/order
  ```

### Update Order Status
- **PATCH** `/order`
- **Payload:**
  ```json
  {
    "status": "RECEIVED"
  }
  ```
- **cURL:**
  ```bash
  curl -X PATCH http://localhost:3000/order/:id/status \
    -H "Content-Type: application/json" \
    -d '{"status":"PREPARING"}'
  ```


---

## Payment

### Update Payment Status
- **PATCH** `/payment/:id/status`
- **Payload:**
  ```json
  {
    "status": "APPROVED"
  }
  ```
- **cURL:**
  ```bash
  curl -X PATCH http://localhost:3000/payment/<id>/status \
    -H "Content-Type: application/json" \
    -d '{"status":"APPROVED"}'
  ```

---
