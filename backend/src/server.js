import express from 'express';
import { userRouter } from './routes/UsersRoutes.js';
import { propostaRouter } from './routes/PropostaRoutes.js';
import cors from 'cors';
const app = express();

app.use(express.json());

app.use(cors());

app.listen(3000, () => {
    console.log("Running server")
})
app.use('/api', userRouter);
app.use('/api', propostaRouter);