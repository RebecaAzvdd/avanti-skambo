const prisma = require('../../prisma/schema.prisma')

exports.updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const {nome, email} = req.body;

    try {
        const updateUser = await prisma.user.update({
            where: { id: userId },
            data
        })
    } catch (error) {
        
    }
}