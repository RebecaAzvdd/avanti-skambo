import { prismaClient } from "../config/PrismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta";

export const AuthService = {
  async registerUser({ nome, email, senha }) {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const user = await prismaClient.user.create({
      data: { nome, email, senha: senhaCriptografada },
    });

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  },

  async loginUser({ email, senha }) {
    const user = await prismaClient.user.findUnique({ where: { email } });

    console.log("Requisição de login:");
    console.log("Email recebido:", email);
    console.log("Senha recebida:", senha);
    console.log("Usuário do banco:", user);

    if (!user) throw new Error("Credenciais inválidas");

    console.log("Senha salva no banco:", user.senha);

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) throw new Error("Credenciais inválidas");

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
  },
};
