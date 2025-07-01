import { AuthService } from '../auth/AuthService.js';

export class AuthController {
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
