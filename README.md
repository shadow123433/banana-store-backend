# 🚀 Sistema de Pedidos - Backend API

API REST desenvolvida em **Node.js** com **Express** e **Prisma ORM**, utilizando **MongoDB** como banco de dados.

Responsável por autenticação de usuários e gerenciamento completo de pedidos, com segurança baseada em **JWT**.

---

## 🌐 API em Produção

👉 https://api-pedidos-uu8x.onrender.com

---

## 🧠 Visão Geral

Este backend faz parte de uma arquitetura **full stack desacoplada**, onde:

- 🔹 Backend: Node.js + Express (Render)
- 🔹 Frontend: React (Vercel)
- 🔹 Banco de Dados: MongoDB

A API fornece endpoints seguros para autenticação e operações de pedidos.

---

## ⚙️ Funcionalidades

- ✔️ Cadastro de usuários  
- ✔️ Login com autenticação JWT  
- ✔️ Criação de pedidos  
- ✔️ Listagem de pedidos por usuário  
- ✔️ Cancelamento de pedidos  
- ✔️ Associação de pedidos com usuário autenticado  

---

## 🔐 Autenticação

- Utiliza **JWT (JSON Web Token)**
- Token gerado no login
- Rotas protegidas exigem envio do token no header:

```http
Authorization: Bearer <token>
```

- Middleware valida e identifica o usuário autenticado

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **MongoDB**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**

---

## 📁 Estrutura do Projeto

```
src/
 ├── controllers/     # Regras de negócio
 │   ├── Authcontroller.js
 │   └── PedidosController.js
 ├── routes/          # Rotas da aplicação
 │   ├── Authroutes.js
 │   └── PedidosRouter.js
 ├── middlewares/
 │   └── auth.js      # Proteção de rotas
 └── prisma/
     └── schema.prisma
     
server.js
```

---

## 🗄️ Modelagem do Banco

### User
- id
- nome
- email (único)
- senha
- pedidos (relação)

### Pedido
- id
- item
- quantidade
- dados de entrega
- status
- usuário associado

---

## 📡 Principais Rotas

### 🔹 Autenticação

```http
POST /Auth/Register
POST /Auth/Login
```

---

### 🔹 Pedidos (protegidas)

```http
POST /Pedidos           # Criar pedido
GET /Pedidos           # Listar pedidos do usuário
PUT /Pedidos/:id       # Cancelar pedido
```

---

## ⚙️ Como rodar localmente

```bash
git clone https://github.com/shadow123433/banana-store-backend.git
cd banana-store-backend
npm install
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz:

```
DATABASE_URL=mongodb+srv://...
JWT_SECRET=sua_chave_secreta
PORT=3000
```

---

## ▶️ Executar o servidor

```bash
node server.js
```

Servidor disponível em:

```
http://localhost:3000
```

---

## 🌐 Deploy

- **Backend:** Render  
- **Banco:** MongoDB Atlas  

👉 API em produção com autenticação e persistência de dados.

---

## 📌 Melhorias Futuras

- Validação de dados (Joi ou Zod)
- Paginação de pedidos
- Atualização de status (além de cancelamento)
- Logs estruturados
- Rate limiting
- Testes automatizados

---

## 📄 Licença

MIT

---

## 👨‍💻 Autor: Thiago Martins

Projeto desenvolvido com foco em aprendizado de arquitetura backend, autenticação segura e integração com frontend em ambiente real.