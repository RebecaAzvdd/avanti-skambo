import { prismaClient } from "../config/PrismaClient.js";

export class PropostaController {
  /**
   * @swagger
   * /api/propostas/{id}/status:
   *   patch:
   *     summary: Atualiza o status de uma proposta (aceitar ou recusar)
   *     tags:
   *       - Propostas
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da proposta a ser atualizada
   *         schema:
   *           type: string
   *     requestBody:
   *       description: Ação para atualizar o status da proposta
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               acao:
   *                 type: string
   *                 enum:
   *                   - aceitar
   *                   - recusar
   *                 description: Ação para definir o novo status da proposta
   *             required:
   *               - acao
   *     responses:
   *       200:
   *         description: Proposta atualizada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 proposta:
   *                   type: object
   *                   description: Objeto com os dados atualizados da proposta
   *       400:
   *         description: Ação inválida ou erro na atualização
   *       404:
   *         description: Proposta não encontrada
   */
  async updateStatusProposta(req, res) {
    const { id } = req.params;
    const { acao } = req.body;

    if (!["aceitar", "recusar"].includes(acao)) {
      console.log("Ação inválida:", acao);
      return res
        .status(400)
        .json({ error: "Ação inválida. Use 'aceitar' ou 'recusar'" });
    }

    try {
      const propostaExistente = await prismaClient.proposta.findUnique({
        where: {
          id: id,
        },
      });

      if (!propostaExistente) {
        return res.status(404).json({ error: "Proposta não encontrada" });
      }

      const novoStatus = acao === "aceitar" ? "aceita" : "recusada";

      const propostaAtualizada = await prismaClient.proposta.update({
        where: {
          id: id,
        },
        data: {
          status: novoStatus,
        },
      });

      return res.status(200).json({
        message: `Proposta ${novoStatus} com sucesso.`,
        proposta: propostaAtualizada,
      });
    } catch (error) {
      console.error("Erro ao atualizar proposta:", error);
      return res.status(400).json(error);
    }
  }

  async createProposta (req, res) {
        const { itemId, userPropostaId, itemPropostaId } = req.body;

        try {
            const novaProposta = await prismaClient.proposta.create({
                data: {
                    itemId,
                    userPropostaId,
                    itemPropostoId,
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
      res.status(404).json({ message: 'Proposta não encontrada ou erro ao cancelar.' });
    }
  }

  async getPropostaByUserId(req, res){
    const { userId } = req.params;

    try{
      const propostas = await prismaClient.proposta.findMany({
        where: {
          userPropostaId: userId
        },
        include: {
          item: true,
          itemProposto: true
        }
      });
       if (propostas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma proposta encontrada para este usuário.' });
      }
       return res.status(200).json(propostas);
    }catch(error){
      console.error('Erro ao buscar propostas:', error);
      return res.status(500).json({ message: 'Erro ao buscar propostas do usuário.' });
    }
  }
}
