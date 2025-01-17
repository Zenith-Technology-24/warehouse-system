import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const publicRouter = Router();

// Prefix: /api/auth
publicRouter.post('/login', login);

export default publicRouter;
