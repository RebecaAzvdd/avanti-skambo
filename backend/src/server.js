import express from 'express';
import { userRouter } from './routes/UsersRoutes.js';
import { propostaRouter } from './routes/PropostaRoutes.js';
import { itensRouter } from './routes/ItensRoutes.js';
import cors from 'cors';
import { authRouter } from './routes/AuthRoutes.js';
const app = express();

app.use(express.json());

app.use(cors());

app.listen(3000, () => {
    console.log("Running server")
})
app.use('/api', userRouter, propostaRouter, itensRouter, authRouter);
