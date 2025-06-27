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
            res.status(404).json({message: 'Usuario não encontrado ou erro ao deletar'});
        }
    }

    // Função para listar todos os usuários (com seleção de campos por segurança)
    static async listarTodos(req, res) {
        try {
            const users = await prisma.user.findMany({
                // Seleciona apenas os campos seguros para serem retornados
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao buscar usuários.", erro: error.message });
        }
    }

    // Função para buscar um usuário pelo ID (sem parseInt e com seleção de campos)
    static async buscarPorId(req, res) {
        try {
            // O ID agora é uma String, não precisa mais de parseInt
            const id = req.params.id; 
            
            const user = await prisma.user.findUnique({
                where: { id: id },
                // Seleciona apenas os campos seguros para serem retornados
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    // Podemos incluir também os itens e propostas do usuário, se quisermos
                    itens: true,
                    propostas: true
                }
            });

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ mensagem: "Usuário não encontrado." });
            }
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao buscar usuário.", erro: error.message });
        }
    }
};

    



