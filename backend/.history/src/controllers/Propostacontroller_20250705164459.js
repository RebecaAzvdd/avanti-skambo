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

  
}
