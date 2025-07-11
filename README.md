# Skambo - API de Troca de Itens

- Skambo é uma aplicação back-end desenvolvida para facilitar trocas de itens entre usuários, incentivando o consumo consciente e a economia colaborativa. A plataforma permite que usuários cadastrem produtos, encontrem itens de interesse e proponham trocas diretamente.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (Autenticação)**
- **Swagger (Documentação da API)**
- **Insomnia e Postman (Testes de Rotas)**

---

## Instalação
```bash
git clone https://github.com/seu-usuario/avanti-skambo.git
cd avanti-skambo
cd backend
npm install
npx prisma generate
```

## Configurar .env
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/skambo_db"
JWT_SECRET="sua_chave_secreta"
```

## Execute as Migrations
```bash
npx prisma migrate dev --name init
```

## RUN
```bash
npm start
```
