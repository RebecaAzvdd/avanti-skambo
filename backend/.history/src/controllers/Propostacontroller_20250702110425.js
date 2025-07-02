import { prismaClient } from "../config/PrismaClient.js";

export class PropostaController {

    async createProposta (req, res) {
        const { itemId, userPropostaId, itemPropostaId } = req.body;

        try {
            const novaProposta = await prismaClient.proposta.create({
                data: {
                    itemId,
                    userPropostaId,
                    itemPropostaId,
                }
            });

            res.status(201).json({
                message: 'Proposta criada com sucesso!',
                proposta: novaProposta
            });
        } catch (error) {
            console.error('Erro ao criar proposta:', error);
            res.status(500).json({message: 'Error ao criar proposta'});
        }
    }

    async cancelarProposta(req, res) {
    const { id } = req.params;

    try {
      const propostaCancelada = await prismaClient.proposta.update({
        where: { id },
        data: { status: 'cancelada' }
      });

      res.json({
        message: 'Proposta cancelada com sucesso!',
        proposta: propostaCancelada
      });
    } catch (error) {
      console.error('Erro ao cancelar proposta:', error);
      res.status(404).json({ message: 'Proposta não encontrada ou erro ao cancelar ' });
    }
  }
}