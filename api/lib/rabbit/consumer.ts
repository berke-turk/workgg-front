import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';

interface Data {
    head?: string;
    request?: object;
    body?: object;
    error: {
        message: string;
        code: number;
    } | null;
}

export interface IConsumer {
    channel: Channel | null;
    createChannel(callback?: () => void): Promise<void>;
    queue(routingKey: string, correlationId: string, data: Data): Promise<string>;
    queueRPC(routingKey: string, replyTo: string, correlationId: string, data: Data): Promise<string>;
    consume(routingKey: string, callback: (msg: amqp.ConsumeMessage | null) => void): Promise<void>;
    ack(msg: amqp.ConsumeMessage): Promise<void>;
    nack(msg: amqp.ConsumeMessage): Promise<void>;
    reject(msg: amqp.ConsumeMessage): Promise<void>;
}