# Skambo - Plataforma de Troca de Itens

- Skambo é uma aplicação web completa (front-end + back-end) criada para facilitar trocas de itens entre usuários, incentivando o consumo consciente e a economia colaborativa.
Usuários podem cadastrar produtos, visualizar itens de interesse e propor trocas diretamente.

---

## Tecnologias Utilizadas

### Back-end
- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (Autenticação)**
- **Swagger (Documentação da API)**
- **Insomnia e Postman (Testes de Rotas)**

### Front-end
- **React 19**
- **Vite**
- **Axios**

---

### Estrutura de Pastas

```bash
avanti-skambo/
│
├── backend/         # API Express + Prisma + PostgreSQL
│   ├── src/
│   ├── prisma/
│   └── .env
│
├── frontend/        # Front-end React + Vite
│   ├── src/
│   └── vite.config.js
│
└── README.md
```

## Instalação
```bash
git clone https://github.com/seu-usuario/avanti-skambo.git
cd avanti-skambo

- Acesse a pasta do back-end:
cd backend

- Instale as dependencias:
npm install
```

## Configurar .env
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/skambo_db"
JWT_SECRET="sua_chave_secreta"
```

## Execute a Seed Migrations e Prisma
```bash
npx prisma generate
npx prisma db seed
npx prisma migrate 
```

## RUN
```bash
npm start
```

## Front End
```bash
- Acesse a pasta do front end:
cd frontend

- Instale as dependencias:
npm install
```
## RUN
```bash
npm run dev
```


