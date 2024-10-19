import amqp from 'amqplib';
import crypto from 'crypto';
import { Router, Request, Response, NextFunction } from 'express';

// DB
import DB from '../../lib/db/connection';
import ClientModel from '../../lib/db/models/client';

declare global {
    namespace Express {
        interface Request {
            client?: ClientModel;
        }
    }
}

export async function ClientSecret(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("Client Secret Header");
        
        if (req.headers['x-client-secret'] == null) { res.status(401).json(); return; }

        let [client] = await DB.queryWithNamedParams<ClientModel>(`
        SELECT * FROM public.client
        WHERE client_secret =:client_secret
        `, {
            'client_secret': req.headers['x-client-secret']
        });
        if (!client) { res.status(401).json(); return; }

        req.client = client;

        next();
    } catch (error) { res.status(401).json(); return; }
}