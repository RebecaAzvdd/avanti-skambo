import { prismaClient } from "../config/PrismaClient.js";

export class UserController {

    async createUser (req, res) {
        const { nome, email, senha } = req.body;

        try {
            const newUser = await prismaClient.user.create({
                data: {
                    nome,
                    email,
                    senha
                }
            });
            res.status(201).json({
                message:'Usuario cadastrado com sucesso!',
                user: newUser
            });
        } catch (error) {
            console.error(error);

            if (error.code === 'P2002') {
                res.status(409).json({ message: 'Email já está em uso'});
            } else {
                res.status(500).json({ message: 'Erro ao criar usuário'});
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
    async deleteUser (req, res) {
        const { id } = req.params;

        try {
            const deletedUser = await prismaClient.user.delete({
                where: { id }
            });

            res.json({
                message: 'Usuario deletado com sucesso',
                user: {
                    id: deletedUser.id,
                    nome: deletedUser.nome,
                    email: deletedUser.email,
                    senha: deletedUser.seenha
                }
            });
        } catch (error) {
            console.error('Error ao deletar usuário', error);
            res.status(404).json({})
        }
    }
};

