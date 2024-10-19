import amqp from 'amqplib';
import crypto from 'crypto';
import { Router, Request, Response, NextFunction } from 'express';

// DB
import DB from '../../lib/db/connection';
import UserModel from '../../lib/db/models/user';

declare global {
    namespace Express {
        interface Request {
            user?: UserModel;
        }
    }
}

export async function User(req: Request, res: Response, next: NextFunction) {
    try {
        console.log("User Secret Header");

        if (req.headers['authorization'] == null) { res.status(401).json(); return; }
        let authorizationHead = req.headers['authorization'].split(' ');
        if (authorizationHead[0] != "Bearer" || authorizationHead[1] == null) { res.status(401).json(); return; }

        let [user] = await DB.queryWithNamedParams<UserModel>(`
        SELECT
        u.*,
        json_build_object(
            'authorize_id', a.authorize_id,
            'user_id', a.user_id,
            'ip_log', a.ip_log,
            'access_token', a.access_token,
            'refresh_token', a.refresh_token,
            'created_at', a.created_at,
            'updated_at', a.updated_at
        ) as authorize
        
        FROM public.authorize a
        
        INNER JOIN public.user u
        ON u.user_id = a.user_id

        WHERE u.client_id =:client_id AND a.access_token =:access_token AND a.is_active = true
        ORDER BY created_at DESC LIMIT 1
        `, {
            'client_id': req.client!.client_id,
            'access_token': authorizationHead[1]
        });
        if (!user) { res.status(401).json(); return; }

        req.user = user;

        next();
    } catch (error) { res.status(401).json(); return; }
}