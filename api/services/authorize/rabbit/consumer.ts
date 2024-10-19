import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import RabbitConfig from '../../../lib/rabbit/config';
import pjson from '../../../package.json';
import { IConsumer } from '../../../lib/rabbit/consumer';

interface Data {
    head: string;
    request?: object;
    body?: object;
    error: {
        message: string;
        code: number;
    } | null;
}

interface Content {
    data: Data;
    dateTime: Date;
}

class Consumer implements IConsumer {
    channel: Channel | null = null;

    async createChannel(callback?: () => void): Promise<void> {
        const connection = await amqp.connect(RabbitConfig.url, {
            clientProperties: {
                connection_name: `workgg/service/authorize/v${pjson.version}-${pjson.sub_version}`
            }
        });
        this.channel = await connection.createChannel();

        connection.on('error', (error: Error) => {
            console.log("on errorrr");
            console.log(error);
        });

        connection.on('close', () => {
            console.error("[AMQP] reconnecting");
            return setTimeout(() => this.createChannel(), 1);
        });

        console.log("created");
        if (callback) callback();
    }

    async queue(routingKey: string, correlationId: string, data: Data): Promise<string> {
        if (!this.channel) {
            await this.createChannel();
        }

        const content: Content = {
            data: data,
            dateTime: new Date()
        };

        await this.channel!.sendToQueue(
            routingKey,
            Buffer.from(JSON.stringify(content)),
            {
                correlationId: correlationId
            }
        );

        console.log(`Mesajınız gönderildi!`);
        return correlationId;
    }

    async queueRPC(routingKey: string, replyTo: string, correlationId: string, data: Data): Promise<string> {
        if (!this.channel) {
            await this.createChannel();
        }

        const content: Content = {
            data: data,
            dateTime: new Date()
        };

        await this.channel!.sendToQueue(
            routingKey,
            Buffer.from(JSON.stringify(content)),
            {
                replyTo: replyTo,
                correlationId: correlationId,
                persistent: false,
                headers: {
                    'x-cache-ttl': 200
                }
            }
        );

        console.log(`Mesajınız "${data}" kanalından gönderildi!`);
        return correlationId;
    }

    async consume(routingKey: string, callback: (msg: amqp.ConsumeMessage | null) => void): Promise<void> {
        if (!this.channel) {
            await this.createChannel();
        }

        await this.channel!.assertExchange(RabbitConfig.exchangeNames.authorize.name, 'direct');

        this.channel!.prefetch(1);
        const q = await this.channel!.assertQueue(routingKey);
        await this.channel!.bindQueue(
            q.queue,
            RabbitConfig.exchangeNames.authorize.name,
            q.queue
        );

        this.channel!.consume(
            q.queue,
            callback,
            {
                noAck: false
            }
        );
    }

    async ack(msg: amqp.ConsumeMessage): Promise<void> {
        this.channel!.ack(msg);
    }

    async nack(msg: amqp.ConsumeMessage): Promise<void> {
        this.channel!.nack(msg);
    }

    async reject(msg: amqp.ConsumeMessage): Promise<void> {
        this.channel!.reject(msg);
    }
}

export default Consumer;