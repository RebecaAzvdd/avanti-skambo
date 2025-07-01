const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seeding...');

  const senhaAliceHash = await bcrypt.hash('senha123', 10);
  const senhaBrunoHash = await bcrypt.hash('senha456', 10);

  await prisma.user.createMany({
    data: [
      { id: '11111111-1111-1111-1111-111111111111', nome: 'Alice Santos', email: 'alice@example.com', senha: senhaAliceHash },
      { id: '22222222-2222-2222-2222-222222222222', nome: 'Bruno Lima', email: 'bruno@example.com', senha: senhaBrunoHash },
    ],
    skipDuplicates: true,
  });
  console.log('Usuários criados.');

  await prisma.item.createMany({
    data: [
      { id: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', nome: 'Livro Harry Potter', descricao: 'Livro em ótimo estado', categoria: 'livros', userResponsavelId: '11111111-1111-1111-1111-111111111111' },
      { id: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', nome: 'Fone JBL', descricao: 'Fone com fio, ótimo grave', categoria: 'eletrônicos', userResponsavelId: '11111111-1111-1111-1111-111111111111' },
      { id: 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', nome: 'Bola de Futebol', descricao: 'Nova, oficial', categoria: 'esportes', status: 'indisponível', userResponsavelId: '22222222-2222-2222-2222-222222222222' },
      { id: 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', nome: 'Camisa Flamengo', descricao: 'Camisa original do time', categoria: 'roupas', userResponsavelId: '22222222-2222-2222-2222-222222222222' },
    ],
    skipDuplicates: true,
  });
  console.log('Itens criados.');

  await prisma.proposta.createMany({
    data: [
      { id: 'ppppppp1-pppp-pppp-pppp-ppppppppppp1', itemId: 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', userPropostaId: '22222222-2222-2222-2222-222222222222', itemPropostoId: 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', status: 'em andamento' },
      { id: 'ppppppp2-pppp-pppp-pppp-ppppppppppp2', itemId: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', userPropostaId: '22222222-2222-2222-2222-222222222222', itemPropostoId: 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', status: 'recusada' },
      { id: 'ppppppp3-pppp-pppp-pppp-ppppppppppp3', itemId: 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', userPropostaId: '11111111-1111-1111-1111-111111111111', itemPropostoId: 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', status: 'aceita' },
    ],
    skipDuplicates: true,
  });
  console.log('Propostas criadas.');
  console.log('Seeding concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });