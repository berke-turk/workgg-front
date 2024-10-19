import amqp from 'amqplib';
import crypto from 'crypto';
import { Router, Request, Response, NextFunction } from 'express';

/* Lib */
import RabbitConfig from '../../lib/rabbit/config';
import Errors from '../../lib/types/errors';

interface ListenerVoid<T> {
    success: boolean,
    data: T,
    error: any
}

async function SendOtp(req: Request, res: Response, next: NextFunction) {
    let key = crypto.randomUUID();
    global.consumeListeners.set(key, async (content) => {
        if (content.data.body.error != null) {
            if (content.data.body.error.code == Errors.AccessToken) {
                res.status(401).json(content.data.body); return;
            }
        }
        res.status(200).json(content.data.body);
    });

    global.producer.queueRPC(
        RabbitConfig.exchangeNames.authorize.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.authorize.queues.sendOtp,
            request: {
                client: req.client,
                user: null,
                clientIp: req.clientIp,
                body: req.body ? req.body : null,
                params: req.params ? req.params : null,
                query: req.query ? req.query : null,
            },
            error: null
        }
    )
    //
}

async function VerifyOtp(req: Request, res: Response, next: NextFunction) {
    let key = crypto.randomUUID();
    global.consumeListeners.set(key, async (content) => {
        if (content.data.body.error != null) {
            if (content.data.body.error.code == Errors.AccessToken) {
                res.status(401).json(content.data.body); return;
            }
        }
        res.status(200).json(content.data.body);
    });

    global.producer.queueRPC(
        RabbitConfig.exchangeNames.authorize.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.authorize.queues.verifyOtp,
            request: {
                client: req.client,
                user: null,
                clientIp: req.clientIp,
                body: req.body ? req.body : null,
                params: req.params ? req.params : null,
                query: req.query ? req.query : null,
            },
            error: null
        }
    )
    //
}

async function Register(req: Request, res: Response, next: NextFunction) {
    let key = crypto.randomUUID();
    global.consumeListeners.set(key, async (content) => {
        if (content.data.body.error != null) {
            if (content.data.body.error.code == Errors.AccessToken) {
                res.status(401).json(content.data.body); return;
            }
        }
        res.status(200).json(content.data.body);
    });

    global.producer.queueRPC(
        RabbitConfig.exchangeNames.authorize.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.authorize.queues.register,
            request: {
                client: req.client,
                user: null,
                clientIp: req.clientIp,
                body: req.body ? req.body : null,
                params: req.params ? req.params : null,
                query: req.query ? req.query : null,
            },
            error: null
        }
    )
    //
}

async function Password(req: Request, res: Response, next: NextFunction) {
    let key = crypto.randomUUID();
    global.consumeListeners.set(key, async (content) => {
        if (content.data.body.error != null) {
            if (content.data.body.error.code == Errors.AccessToken) {
                res.status(401).json(content.data.body); return;
            }
        }
        res.status(200).json(content.data.body);
    });

    global.producer.queueRPC(
        RabbitConfig.exchangeNames.authorize.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.authorize.queues.password,
            request: {
                client: req.client,
                user: null,
                clientIp: req.clientIp,
                body: req.body ? req.body : null,
                params: req.params ? req.params : null,
                query: req.query ? req.query : null,
            },
            error: null
        }
    )
    //
}

async function RefreshToken(req: Request, res: Response, next: NextFunction) {
    let key = crypto.randomUUID();
    global.consumeListeners.set(key, async (content) => {
        if (content.data.body.error != null) {
            if (content.data.body.error.code == Errors.AccessToken) {
                res.status(401).json(content.data.body); return;
            }
        }
        res.status(200).json(content.data.body);
    });

    global.producer.queueRPC(
        RabbitConfig.exchangeNames.authorize.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.authorize.queues.refreshToken,
            request: {
                client: req.client,
                user: req.user,
                clientIp: req.clientIp,
                body: req.body ? req.body : null,
                params: req.params ? req.params : null,
                query: req.query ? req.query : null,
            },
            error: null
        }
    )
    //
}

async function Logout(req: Request, res: Response, next: NextFunction) {
    let key = crypto.randomUUID();
    global.consumeListeners.set(key, async (content) => {
        if (content.data.body.error != null) {
            if (content.data.body.error.code == Errors.AccessToken) {
                res.status(401).json(content.data.body); return;
            }
        }
        res.status(200).json(content.data.body);
    });

    global.producer.queueRPC(
        RabbitConfig.exchangeNames.authorize.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.authorize.queues.logout,
            request: {
                client: req.client,
                user: req.user,
                clientIp: req.clientIp,
                body: req.body ? req.body : null,
                params: req.params ? req.params : null,
                query: req.query ? req.query : null,
            },
            error: null
        }
    )
    //
}

async function ResetInitialize(req: Request, res: Response, next: NextFunction) {
    /* Rabbit üzerinden order servisine gönderilmelidir */

    //

    res.json({ params: req.params, message: 'Reset Initialize' });
}

async function ResetVerify(req: Request, res: Response, next: NextFunction) {
    /* Rabbit üzerinden order servisine gönderilmelidir */

    //

    res.json({ params: req.params, message: 'Reset Verify' });
}

async function ResetComplete(req: Request, res: Response, next: NextFunction) {
    /* Rabbit üzerinden order servisine gönderilmelidir */

    //

    res.json({ params: req.params, message: 'Reset Complete' });
}

export default {
    SendOtp, VerifyOtp, Register, Password, RefreshToken, Logout,
    Reset: { Initialize: ResetInitialize, Verify: ResetVerify, Complete: ResetComplete }
}