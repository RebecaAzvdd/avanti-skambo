import { prismaClient } from "../config/PrismaClient.js";

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
        .json({ error: "Erro ao filtrar itens por categoria." });
    }
  }

  async getItensByKeyWord(req, res) {
    const { palavra } = req.query;

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

  // Métodos Eric
  async createItem(req, res) {
    //vi que aqui usaram req.query, devo usar isso também?? ou não faz diferança?
    const { nome, descricao, categoria, imagem, userResponsavelId } = req.body;

    if (!nome || !descricao || !categoria || !userResponsavelId) {
      return res
        .status(400)
        .json({ error: "Preencha todos os campos obrigatórios." });
    }

    try {
      const novoItem = await prismaClient.item.create({
        data: {
          nome,
          descricao,
          categoria,
          imagem,
          userResponsavelId,
          status: "disponível",
          //coloquei para sempre começar como disponível, correto?? pois se é adicionado agora ainda não foi usado
        },
      });

      return res.status(201).json(novoItem);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar item." });
    }
  }

  async updateItem(req, res) {
    const { id } = req.params;
    const { nome, descricao, categoria, status, imagem } = req.body;

    try {
      //aqui eu tô pegando o ID, mas eu deveria usar outro comando? no estudo que eu fiz antes...
      //... usei um comando pra achar por ID findbyID algo assim, mas não tive certeza se vale pra cá também
      //... por que no outro eu usei mongoDB e aqui é Prisma então busquei o equivalente nele
      const itemAtualizado = await prismaClient.item.update({
        where: { id },
        data: {
          nome,
          descricao,
          categoria,
          status,
          imagem,
        },
      });

      return res.status(200).json(itemAtualizado);
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Item não encontrado ou erro na atualização." });
    }
  }

  async deleteItem(req, res) {
    const { id } = req.params;

    try {
      await prismaClient.item.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Item deletado com sucesso." });
    } catch (error) {
      return res
        .status(404)
        .json({ error: "Item não encontrado para deletar." });
    }
  }
}
