# 🍌 Banana Store - Backend

Este repositório contém o **backend** da aplicação **Banana Store**, responsável pela API REST, autenticação de usuários e gerenciamento de dados.

> ⚠️ **Status:** Projeto em desenvolvimento.

---

## 🧠 Tecnologias Utilizadas

* Node.js
* Express
* Prisma ORM
* MongoDB
* JWT (JSON Web Token)
* Cors
* Dotenv
* Bcrypt

---

## 📁 Estrutura de Pastas

```bash
Backend/
├── node_modules/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── Authcontroller.js
│   │   └── PedidosControllers.js
│   ├── routes/
│   │   ├── Authroutes.js
│   │   └── PedidosRouter.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## 🔗 Integração com Frontend

Este backend se conecta com o frontend da aplicação:

👉link do frontend:
`https://github.com/shadow123433/banana-store-frontend.git`

---

## 📌 Rotas Principais

### 🔐 Autenticação (`/Auth`)

* `POST /Auth/Register` – Cria um novo usuário
* `POST /Auth/Login` – Autentica o usuário e retorna um token JWT

### 📦 Pedidos (`/Pedidos`)

* Rotas para gerenciamento de pedidos (em desenvolvimento)

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

* Node.js (v18 ou superior)
* MongoDB (local ou MongoDB Atlas)

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="sua_string_de_conexao_mongodb"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

---

## ▶️ Como Rodar o Projeto

```bash
# Instalar dependências
npm install

# rode
node server.js
```

---

## 📌 Funcionalidades (em desenvolvimento)

* [x] Cadastro de usuários
* [ ] Login com autenticação JWT
* [x] CRUD de pedidos
* [ ] Middleware de autenticação
* [ ] Validação de dados
* [ ] Controle de permissões

---

## 🛠️ Boas Práticas Aplicadas

* Separação por camadas (controllers, routes)
* Uso de variáveis de ambiente (.env)
* Estrutura escalável e modular
* Organização com Prisma ORM

---

## 📄 Observações

Este projeto ainda está em evolução, podendo sofrer alterações na estrutura, rotas e regras de negócio.

---

## 👨‍💻 Autor

Desenvolvido por **Thiago Martins**

---
