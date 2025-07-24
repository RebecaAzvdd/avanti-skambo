import { prismaClient } from "../config/PrismaClient.js";
import saveBase64Image from "../controllers/ImageController.js";
import path from "path";

export class ItensController {
  /**
   * @swagger
   * /api/itens:
   *   get:
   *     summary: Retorna todos os itens cadastrados
   *     tags:
   *       - Itens
   *     responses:
   *       200:
   *         description: Lista de itens retornada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   nome:
   *                     type: string
   *                   descricao:
   *                     type: string
   *                   userResponsavel:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       nome:
   *                         type: string
   *                       email:
   *                         type: string
   *       500:
   *         description: Erro ao buscar todos os itens
   */
  async getAllItens(req, res) {
    try {
      const itens = await prismaClient.item.findMany({
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
      return res.status(500).json({ error: "Erro ao buscar todos os itens." });
    }
  }

  /**
   * @swagger
   * /api/itens/{id}:
   *   get:
   *     summary: Retorna um item pelo ID
   *     tags:
   *       - Itens
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do item a ser buscado
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Item retornado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                 nome:
   *                   type: string
   *                 descricao:
   *                   type: string
   *                 userResponsavel:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     nome:
   *                       type: string
   *                     email:
   *                       type: string
   *       500:
   *         description: Erro ao buscar item por ID
   */
  async getItensById(req, res) {
    try {
      const { id } = req.params;
      const itens = await prismaClient.item.findUnique({
        where: { id },
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
      return res.status(500).json({ error: "Erro ao buscar item por id." });
    }
  }

  /**
   * @swagger
   * /api/itens/disponiveis:
   *   get:
   *     summary: Retorna todos os itens disponíveis
   *     tags:
   *       - Itens
   *     responses:
   *       200:
   *         description: Lista de itens disponíveis retornada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   nome:
   *                     type: string
   *                   descricao:
   *                     type: string
   *                   status:
   *                     type: string
   *                   userResponsavel:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       nome:
   *                         type: string
   *                       email:
   *                         type: string
   *       500:
   *         description: Erro ao buscar itens disponíveis
   */
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

  /**
   * @swagger
   * /api/itens/categoria:
   *   get:
   *     summary: Filtra itens disponíveis por categoria
   *     tags:
   *       - Itens
   *     parameters:
   *       - in: query
   *         name: categoria
   *         required: true
   *         description: Categoria a ser usada na filtragem dos itens
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Lista de itens filtrada por categoria
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   nome:
   *                     type: string
   *                   descricao:
   *                     type: string
   *                   categoria:
   *                     type: string
   *                   status:
   *                     type: string
   *                   userResponsavel:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       nome:
   *                         type: string
   *                       email:
   *                         type: string
   *       500:
   *         description: Erro ao filtrar itens por categoria
   */
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

  /**
   * @swagger
   * /api/itens/pesquisa:
   *   get:
   *     summary: Busca itens disponíveis por palavra-chave no nome ou descrição
   *     tags:
   *       - Itens
   *     parameters:
   *       - in: query
   *         name: palavra
   *         required: true
   *         description: Palavra-chave para buscar no nome ou na descrição dos itens
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Lista de itens encontrados com base na palavra-chave
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                   nome:
   *                     type: string
   *                   descricao:
   *                     type: string
   *                   status:
   *                     type: string
   *                   userResponsavel:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       nome:
   *                         type: string
   *                       email:
   *                         type: string
   *       500:
   *         description: Erro ao buscar itens por palavra-chave
   */
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

  /**
   * @swagger
   * /itens:
   *   post:
   *     summary: Cria um novo item
   *     tags:
   *       - Itens
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - descricao
   *               - categoria
   *               - userResponsavelId
   *             properties:
   *               nome:
   *                 type: string
   *                 example: Camiseta Preta
   *               descricao:
   *                 type: string
   *                 example: Camiseta tamanho M em bom estado
   *               categoria:
   *                 type: string
   *                 example: Roupas
   *               imagem:
   *                 type: string
   *                 example: https://link-da-imagem.com/camiseta.jpg
   *               userResponsavelId:
   *                 type: string
   *                 example: user_abc123
   *     responses:
   *       201:
   *         description: Item criado com sucesso
   *       400:
   *         description: Campos obrigatórios não preenchidos
   *       500:
   *         description: Erro interno ao criar item
   */
  async createItem(req, res, next) {
    const { nome, descricao, categoria, imagem, userResponsavelId } = req.body;

    if (!nome || !descricao || !categoria || !userResponsavelId) {
      return res
        .status(400)
        .json({ error: "Preencha todos os campos obrigatórios." });
    }

    let imagemFileName = null;
    try {
      if (imagem) {
        console.log("Processando imagem base64...");
        imagemFileName = await saveBase64Image(imagem);
        console.log("Imagem salva como:", imagemFileName);
      }

      const novoItem = await prismaClient.item.create({
        data: {
          nome,
          descricao,
          categoria,
          imagem: imagemFileName,
          userResponsavelId,
          status: "disponível",
        },
      });

      return res.status(201).json(novoItem);
    } catch (error) {
      console.error("Erro ao criar item:", error);
      next(error);
    }
  }

  /**
   * @swagger
   * /itens/{id}:
   *   put:
   *     summary: Atualiza um item existente
   *     tags:
   *       - Itens
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do item a ser atualizado
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *                 example: Camiseta Preta
   *               descricao:
   *                 type: string
   *                 example: Camiseta tamanho M em bom estado
   *               categoria:
   *                 type: string
   *                 example: Roupas
   *               status:
   *                 type: string
   *                 example: disponível
   *               imagem:
   *                 type: string
   *                 example: https://link-da-imagem.com/camiseta.jpg
   *     responses:
   *       200:
   *         description: Item atualizado com sucesso
   *       404:
   *         description: Item não encontrado ou erro na atualização
   */
  async updateItem(req, res) {
    const { id } = req.params;
    const { nome, descricao, categoria, status, imagem } = req.body;

    try {
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

  /**
   * @swagger
   * /itens/{id}:
   *   delete:
   *     summary: Deleta um item existente
   *     tags:
   *       - Itens
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do item a ser deletado
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Item deletado com sucesso
   *       404:
   *         description: Item não encontrado para deletar
   */
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

export const getAllItens = async (req, res) => {
  try {
    const { categoria, search } = req.query;

    const itens = await prisma.item.findMany({
      where: {
        AND: [
          categoria && categoria !== "Todos"
            ? { categoria: { equals: categoria.toLowerCase() } }
            : {},
          search
            ? {
                OR: [
                  { nome: { contains: search, mode: "insensitive" } },
                  { descricao: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
        ],
      },
    });

    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar itens." });
  }
};
