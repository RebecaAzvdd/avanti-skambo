import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/UsersRoutes.js';
import { propostaRouter } from './routes/PropostaRoutes.js';
import { itensRouter } from './routes/ItensRoutes.js';
import { authRouter } from './routes/AuthRoutes.js';
import { setupSwagger } from './doc/swagger.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

setupSwagger(app);

app.use(cors());

app.listen(3000, () => {
    console.log("Running server http://localhost:3000/api")
     console.log('Documentação Swagger em http://localhost:3000/api-docs');
})
app.use('/api', userRouter, propostaRouter, itensRouter, authRouter);
