import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/UsersRoutes.js';
import { propostaRouter } from './routes/PropostaRoutes.js';
import { itensRouter } from './routes/ItensRoutes.js';
import { authRouter } from './routes/AuthRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRouter, propostaRouter, itensRouter, authRouter);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});