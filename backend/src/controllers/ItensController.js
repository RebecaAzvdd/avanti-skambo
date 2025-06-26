import { prismaClient } from "../config/PrismaClient";

export class ItensController {
  async getAllItensAvailable(req, res) {
    try {
      const itens = await prismaClient.item.findMany({
        where: {
          status: "disponível",
        },
        include: {
          userResponsavel: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      return res.status(200).json(itens);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar itens disponíveis." });
    }
  }

  async getItensByCategory(req, res) {
    const { categoria } = req.query;

    try {
      const itens = await prismaClient.item.findMany({
        where: {
          status: "disponível",
          categoria: {
            contains: String(categoria),
            mode: "insensitive",
          },
        },
        include: {
          userResponsavel: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });
      return res.status(200).json(itens);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao filtrar itens por categoria." });
    }
  }

  async getItensByKeyWord(req, res) {
    const { palavra } = req.body;

    try {
      const itens = await prismaClient.item.findMany({
        where: {
          status: "disponível",
          OR: [
            {
              nome: {
                contains: String(palavra),
                mode: "insensitive",
              },
            },
            {
              descricao: {
                contains: String(palavra),
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          userResponsavel: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
      });
      return res.status(200).json(itens);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar itens por palavra-chave." });
    }
  }
}
