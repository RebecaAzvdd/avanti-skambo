import { prismaClient } from "../config/PrismaClient";

export class UserController {
    async updateUser (req, res)  {
    const {userId} = req.params;
    const {nome, email} = req.body;

    try {
        const updateUser = await prismaClient.user.update({
            where: { id: userId },
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