import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/UsersRoutes.js';
import { propostaRouter } from './routes/PropostaRoutes.js';
import { itensRouter } from './routes/ItensRoutes.js';
import { authRouter } from './routes/AuthRoutes.js';
import { setupSwagger } from './doc/swagger.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

setupSwagger(app);

app.listen(3000, () => {
    console.log("Running server http://localhost:3000/api")
     console.log('Documentação Swagger em http://localhost:3000/api-docs');
})
app.use('/api', userRouter, propostaRouter, itensRouter, authRouter);
