import { prismaClient } from "../config/PrismaClient.js";

export class UserController {

    async createUser (req, res) {
        const
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

