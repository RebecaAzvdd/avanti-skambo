import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');
  
  await prisma.proposta.deleteMany();
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();

  console.log('Tabelas limpas.');
  // Senhas
  const senhaAliceHash = await bcrypt.hash('senha123', 10);
  const senhaBrunoHash = await bcrypt.hash('senha456', 10);

  // Usuários
  const userAliceId = uuidv4();
  const userBrunoId = uuidv4();

  await prisma.user.createMany({
    data: [
      { id: userAliceId, nome: 'Alice Santos', email: 'alice@example.com', senha: senhaAliceHash },
      { id: userBrunoId, nome: 'Bruno Lima', email: 'bruno@example.com', senha: senhaBrunoHash },
    ],
    skipDuplicates: true,
  });
  console.log('Usuários criados.');

  // Itens
  const itemIds = {
    item1: uuidv4(),
    item2: uuidv4(),
    item3: uuidv4(),
    item4: uuidv4(),
    item5: uuidv4(),
    item6: uuidv4(),
    item7: uuidv4(),
  };

  await prisma.item.createMany({
    data: [
      {
        id: itemIds.item1,
        nome: 'Livro: O Senhor dos Anéis',
        descricao: 'Trilogia completa em capa dura.',
        categoria: 'livros',
        imagem: 'uploads/senhor-aneis.webp',
        userResponsavelId: userAliceId,
      },
      {
        id: itemIds.item2,
        nome: 'Headset JBL Quantum',
        descricao: 'Headset gamer com som 7.1, ótimo estado.',
        categoria: 'eletrônicos',
        imagem: 'uploads/headset-jbl.webp',
        userResponsavelId: userAliceId,
      },
      {
        id: itemIds.item3,
        nome: 'Bola Adidas Copa',
        descricao: 'Nova, oficial FIFA, usada 2x.',
        categoria: 'esportes',
        imagem: 'uploads/bola-adidas.webp',
        status: 'indisponível',
        userResponsavelId: userBrunoId,
      },
      {
        id: itemIds.item4,
        nome: 'Camisa Oficial do Brasil',
        descricao: 'Camisa original da seleção 2022, tamanho G.',
        categoria: 'roupas',
        imagem: 'uploads/camisa-brasil.webp',
        userResponsavelId: userBrunoId,
      },
      {
        id: itemIds.item5,
        nome: 'Mouse Logitech G203',
        descricao: 'Mouse gamer RGB, pouco uso.',
        categoria: 'eletrônicos',
        imagem: 'uploads/mouse-logitech.webp',
        userResponsavelId: userAliceId,
      },
      {
        id: itemIds.item6,
        nome: 'Livro: O Pequeno Príncipe',
        descricao: 'Edição ilustrada, ótima condição.',
        categoria: 'livros',
        imagem: 'uploads/pequeno-principe.webp',
        userResponsavelId: userBrunoId,
      },
      {
        id: itemIds.item7,
        nome: 'Tênis Nike Revolution',
        descricao: 'Tamanho 42, usado 3 vezes.',
        categoria: 'roupas',
        imagem: 'uploads/tenis-nike.webp',
        userResponsavelId: userAliceId,
      },
    ],
    skipDuplicates: true,
  });
  console.log('Itens criados.');

  // Propostas
  await prisma.proposta.createMany({
    data: [
      {
        id: uuidv4(),
        itemId: itemIds.item1,
        userPropostaId: userBrunoId,
        itemPropostoId: itemIds.item4,
        status: 'em andamento',
      },
      {
        id: uuidv4(),
        itemId: itemIds.item2,
        userPropostaId: userBrunoId,
        itemPropostoId: itemIds.item3,
        status: 'recusada',
      },
      {
        id: uuidv4(),
        itemId: itemIds.item4,
        userPropostaId: userAliceId,
        itemPropostoId: itemIds.item2,
        status: 'aceita',
      },
    ],
    skipDuplicates: true,
  });
  console.log('Propostas criadas.');

  console.log('✅ Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
