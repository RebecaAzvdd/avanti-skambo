const prisma=require('../../prisma/schema.prisma')

exports.itens = async (req, res) => {
    const itemCod=parseInt(req.params.codigo);

    try {
        const itens=await prisma.item.update({
            where: { id:itemCod },
            data: {
                nome,
                descricao,
                categoria,
                usuario //usuario será um objeto
            }
        });

        res.json({
            message: "atualização bem sucedida",
            item: this.itens
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({message: 'Item não encontrado'})
    }

};