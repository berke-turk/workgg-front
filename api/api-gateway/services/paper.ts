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

async function Create(req: Request, res: Response, next: NextFunction) {
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
        RabbitConfig.exchangeNames.paper.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.paper.queues.create,
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

async function List(req: Request, res: Response, next: NextFunction) {
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
        RabbitConfig.exchangeNames.paper.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.paper.queues.list,
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

async function Details(req: Request, res: Response, next: NextFunction) {
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
        RabbitConfig.exchangeNames.paper.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.paper.queues.details,
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

async function EditPage(req: Request, res: Response, next: NextFunction) {
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
        RabbitConfig.exchangeNames.paper.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.paper.queues.editPage,
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

async function Update(req: Request, res: Response, next: NextFunction) {
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
        RabbitConfig.exchangeNames.paper.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.paper.queues.editPage,
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

async function Delete(req: Request, res: Response, next: NextFunction) {
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
        RabbitConfig.exchangeNames.paper.queue,
        RabbitConfig.directReply,
        key,
        {
            head: RabbitConfig.exchangeNames.paper.queues.delete,
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

export default {
    Create, Details, EditPage, Update, List, Delete
}