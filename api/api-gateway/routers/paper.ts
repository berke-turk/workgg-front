import { Router } from 'express';
const router = Router();

/* Middlewares */
import * as MiddlewareJoi from '../middlewares/joi/paper';
import * as MiddlewareClient from '../middlewares/client';
import * as MiddlewareAuthorize from '../middlewares/authorize';

/* Services */
import PaperService from '../services/paper';

router.post('/', MiddlewareClient.ClientSecret, MiddlewareAuthorize.User, MiddlewareJoi.Create, PaperService.Create);
router.get('/', MiddlewareClient.ClientSecret, MiddlewareJoi.List, PaperService.List);
router.get('/edit/:paper_id', MiddlewareClient.ClientSecret, MiddlewareAuthorize.User, MiddlewareJoi.EditPage, PaperService.EditPage);
router.put('/edit/:paper_id', MiddlewareClient.ClientSecret, MiddlewareAuthorize.User, MiddlewareJoi.Update, PaperService.Update); // Client Admin
router.delete('/:paper_id', MiddlewareClient.ClientSecret, MiddlewareAuthorize.User, MiddlewareJoi.Delete, PaperService.Delete);

router.get('/d/:paper_no/:link_seo', MiddlewareClient.ClientSecret, MiddlewareJoi.Details, PaperService.Details);

export default router;