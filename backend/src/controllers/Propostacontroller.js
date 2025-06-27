import { prismaClient } from "../config/PrismaClient.js";

export class PropostaController {
  async updateStatusProposta(req, res) {
    const { id } = req.params;
    const { acao } = req.body;

    if (!["aceita", "recusar"].includes(acao)) {
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
        return res.status(400).json(error);
      }
  }
}
