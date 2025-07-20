import { AuthService } from '../auth/AuthService.js';

export class AuthController {
  /**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *       409:
 *         description: Email já está em uso
 *       500:
 *         description: Erro ao cadastrar usuário
 */
  async register(req, res) {
    console.log('req.body recebido:', req.body);
    const { nome, email, senha } = req.body;

    try {
      const newUser = await AuthService.registerUser({ nome, email, senha });
      res.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        user: newUser
      });
    } catch (error) {
      console.error(error);
      if (error.code === 'P2002') {
        res.status(409).json({ message: 'Email já está em uso' });
      } else {
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
      }
    }
  };

  /**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               senha:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Credenciais inválidas ou erro de autenticação
 */
  async login(req, res) {
    console.log('req.body recebido no login:', req.body);
    const { email, senha } = req.body;

    try {
      const result = await AuthService.loginUser({ email, senha });
      res.status(200).json({
        message: 'Login realizado com sucesso',
        ...result
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
};
