import express from 'express';
import cors from 'cors';
import publicRouter from './routes/public.routes';
import protectedRouter from './routes/protected.routes';

const app = express();

app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());

// Prefix all public routes with /api/auth
app.use('/api/auth', publicRouter);

// Prefix all protected routes with /api/protected
app.use('/api', protectedRouter);

export default app;
