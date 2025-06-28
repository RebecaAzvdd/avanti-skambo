import { prismaClient } from "../config/PrismaClient.js";

export class UserController {

    async createUser(req, res) {
  const { nome, email } = req.body;

  try {
    const newUser = await prismaClient.user.create({
      data: {
        nome: String(nome),   // Garante que é string (evita erro se vier undefined ou number)
        email: String(email)
      }
    });

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user: newUser
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error); // Mostra o erro completo no terminal

    // Erro de campo único duplicado (email)
    if (error.code === 'P2002') {
      res.status(409).json({ message: 'Email já está em uso' });

    // Validação do Prisma ou outro erro
    } else {
      res.status(500).json({
        message: 'Erro ao criar usuário',
        detalhe: error.message,
        prismaCode: error.code || null
      });
    }
  }
}

    

    async updateUser (req, res)  {
    const {id} = req.params;
    const {nome, email} = req.body;

    try {
        const updateUser = await prismaClient.user.update({
            where: { id: id },
            data: {
                nome,
                email
            }
        });

        res.json({
            message: 'Usuário atualizado com sucesso',
            user: updateUser
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message:'Usuário não encontrado ou erro ao atualizar'})
    }
} 
};

