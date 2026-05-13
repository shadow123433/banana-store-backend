# 🚀 API de Pedidos com Autenticação JWT

API REST desenvolvida com **Node.js**, **Express** e **Prisma ORM**, com autenticação baseada em **JWT**, permitindo cadastro de usuários e gerenciamento de pedidos.

---

## 🧠 Objetivo

Construir uma API completa com autenticação segura e controle de dados por usuário, simulando um sistema real de pedidos com isolamento de acesso.

---

## 🛠️ Tecnologias

- Node.js  
- Express  
- Prisma ORM  
- MongoDB  
- JSON Web Token (JWT)  
- Bcrypt  

---

## 📦 Modelagem do Banco

### 👤 Usuário
- id  
- nome  
- email (único)  
- senha (criptografada)  

### 📦 Pedido
- id  
- item  
- quantidade  
- dados de entrega  
- status (`PENDENTE` por padrão)  
- createdAt  
- usuarioId  

---

## 🔗 Relacionamento

- Um usuário pode ter vários pedidos  
- Cada pedido pertence a um único usuário  

---

## 🔐 Autenticação

A API utiliza JWT para proteger rotas.

### Fluxo:

1. Usuário faz login  
2. Recebe um token JWT  
3. Envia o token no header das requisições  

### Header obrigatório:

```http
Authorization: Bearer seu_token_aqui
```

---

## 📡 Rotas da API

### 🔐 Auth

#### POST `/Auth/cadastro`
Cria um novo usuário

```json
{
  "nome": "Thiago",
  "email": "thiago@email.com",
  "senha": "123456"
}
```

---

#### POST `/Auth/login`
Retorna token JWT

```json
{
  "email": "thiago@email.com",
  "senha": "123456"
}
```

📥 Resposta:

```json
{
  "user": {
    "id": "123",
    "nome": "Thiago"
  },
  "token": "jwt_token_aqui"
}
```

---

### 📦 Pedidos (Protegidas)

#### POST `/Pedidos`
Cria um pedido

```json
{
  "item": "Pizza",
  "quantidade": 2,
  "entrega": {
    "nome": "Thiago",
    "endereco": "Rua A",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "Linhares",
    "uf": "ES",
    "telefone": "999999999"
  }
}
```

---

#### GET `/Pedidos`
Lista pedidos do usuário logado

---

#### PATCH `/Pedidos/:id/cancelar`
Cancela um pedido

---

## ⚙️ Como rodar o projeto

### 1. Clonar repositório
```bash
git clone <seu-repo>
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Criar arquivo `.env`
```env
DATABASE_URL="sua_string_mongodb"
JWT_SECRET="sua_chave_secreta"
```

### 4. Rodar o servidor
```bash
node server.js
```

Servidor:
```
http://localhost:3000
```

---

## 🧪 Testando a API

Use ferramentas como:

- Postman  
- Insomnia  

Fluxo recomendado:

1. Criar usuário  
2. Fazer login  
3. Copiar token  
4. Testar rotas de pedidos  

---

## 🧠 Arquitetura

- Controllers → lógica da aplicação  
- Routes → definição das rotas  
- Middleware → autenticação JWT  
- Prisma → acesso ao banco  

---

## 📌 Melhorias Futuras

- Implementar ENUM para status  
- Adicionar `updatedAt`  
- Padronizar rotas (`/api/...`)  
- Tratamento global de erros  
- Refresh token  
- Deploy (Render, Railway, etc.)  

---

## 📄 Licença

MIT