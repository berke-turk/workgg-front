import { Router } from 'express';
const router = Router();

/* Middlewares */
import * as MiddlewareJoi from '../middlewares/joi/authorize';
import * as MiddlewareClient from '../middlewares/client';
import * as MiddlewareAuthorize from '../middlewares/authorize';

/* Services */
import AuthorizeService from '../services/authorize';

router.post('/send-otp', MiddlewareClient.ClientSecret, MiddlewareJoi.SendOtp, AuthorizeService.SendOtp);
router.post('/verify-otp', MiddlewareClient.ClientSecret, MiddlewareJoi.VerifyOtp, AuthorizeService.VerifyOtp);
router.post('/register', MiddlewareClient.ClientSecret, MiddlewareJoi.Register, AuthorizeService.Register);
router.post('/password', MiddlewareClient.ClientSecret, MiddlewareJoi.Password, AuthorizeService.Password);
router.post('/refresh-token', MiddlewareClient.ClientSecret, MiddlewareAuthorize.User, MiddlewareJoi.RefreshToken, AuthorizeService.RefreshToken);
router.get('/logout', MiddlewareClient.ClientSecret, MiddlewareAuthorize.User, AuthorizeService.Logout);

export default router;