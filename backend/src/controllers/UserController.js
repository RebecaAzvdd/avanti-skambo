import { prismaClient } from "../config/PrismaClient.js";
import bcrypt from "bcrypt";

export class UserController {

  /**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários cadastrados
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: user_123
 *                   nome:
 *                     type: string
 *                     example: João da Silva
 *                   email:
 *                     type: string
 *                     example: joao@email.com
 *       500:
 *         description: Erro ao buscar usuários
 */
  async listarTodos(req, res) {
    try {
      const users = await prismaClient.user.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar usuários.", erro: error.message });
    }
  };

  /**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: user_123
 *                 nome:
 *                   type: string
 *                   example: Maria Oliveira
 *                 email:
 *                   type: string
 *                   example: maria@email.com
 *                 itens:
 *                   type: array
 *                   items:
 *                     type: object
 *                 propostas:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          nome: true,
          email: true,
          itens: true,
          propostas: true,
        },
      });

      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar usuário.", erro: error.message });
    }
  };


  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags:
   *       - Usuários
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       409:
   *         description: Email já está em uso
   *       500:
   *         description: Erro ao criar usuário
   */
  async createUser(req, res) {
    const { nome, email, senha } = req.body;
    try {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      const newUser = await prismaClient.user.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
        },
      });
      return res.status(201).json({
        message: "Usuario cadastrado com sucesso!",
        user: {
          id: newUser.id,
          nome: newUser.nome,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Email já está em uso" });
      } else {
        return res.status(500).json({ message: "Erro ao criar usuário" });
      }
    }
  }

  /**
   * @swagger
   * /api/user/{id}:
   *   put:
   *     summary: Atualiza um usuário pelo ID
   *     tags:
   *       - Usuários
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do usuário
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
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     nome:
   *                       type: string
   *                     email:
   *                       type: string
   *       404:
   *         description: Usuário não encontrado ou erro ao atualizar
   */
  async updateUser(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
      const updatedUser = await prismaClient.user.update({
        where: { id: id },
        data: {
          nome,
          email,
        },
      });
      return res.json({
        message: "Usuário atualizado com sucesso",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(404)
        .json({ message: "Usuário não encontrado ou erro ao atualizar" });
    }
  };

  /**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: Usuário não encontrado ou erro ao deletar
 */
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const deletedUser = await prismaClient.user.delete({
        where: { id },
      });
      return res.json({
        message: "Usuario deletado com sucesso",
        user: {
          id: deletedUser.id,
          nome: deletedUser.nome,
          email: deletedUser.email,
        },
      });
    } catch (error) {
      console.error("Error ao deletar usuário", error);
      return res
        .status(404)
        .json({ message: "Usuario não encontrado ou erro ao deletar" });
    }
  }
}