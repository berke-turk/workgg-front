import amqp from 'amqplib';
import crypto from 'crypto';
import { Router, Request, Response, NextFunction } from 'express';

/* Lib */
import RabbitConfig from '../../lib/rabbit/config';
import Errors from '../../lib/types/errors';

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
    RabbitConfig.exchangeNames.user.queue,
    RabbitConfig.directReply,
    key,
    {
      head: RabbitConfig.exchangeNames.user.queues.create,
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
    RabbitConfig.exchangeNames.user.queue,
    RabbitConfig.directReply,
    key,
    {
      head: RabbitConfig.exchangeNames.user.queues.list,
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
  Create, List
}