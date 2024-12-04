import { Router } from 'express';
import authService from './auth.service';

const AuthController = Router();

AuthController.post('/signin', authService.signin);
AuthController.post('/signup', authService.signup);

export default AuthController;