const prisma = require('../../prisma/schema.prisma')

exports.updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const {nome, email} = req.body;

    try {
        const updateUser = await prisma.user.update({
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
        res.status(404).json({})
    }
}