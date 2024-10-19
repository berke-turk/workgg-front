import { Router } from 'express';
const router = Router();

/* Middlewares */
import * as MiddlewareJoi from '../middlewares/joi/user';
import * as MiddlewareClient from '../middlewares/client';
import * as MiddlewareAuthorize from '../middlewares/authorize';

/* Services */
import UserService from '../services/user';

router.post('/', MiddlewareClient.ClientSecret, MiddlewareAuthorize.User, MiddlewareJoi.Create, UserService.Create);
router.get('/', MiddlewareClient.ClientSecret, MiddlewareAuthorize.User, MiddlewareJoi.List, UserService.List);

export default router;