import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import RabbitConfig from '../../lib/rabbit/config';
import pjson from '../../package.json';

class Producer {
    channel: Channel | null = null;

    async createChannel(callback?: () => void): Promise<void> {
        const connection: Connection = await amqp.connect(RabbitConfig.url);
        this.channel = await connection.createChannel();

        connection.on('close', () => {
            console.error("[AMQP] reconnecting");
            return setTimeout(() => this.createChannel(callback), 1);
        });

        this.channel?.on('error', (error: Error) => {
            console.log("error verdi");
            console.log(error);
        });

        if (callback) callback();
    }

    async queueRPC(routingKey: string, replyTo: string, correlationId: string, data: { head: string, request: any, error: { message: string, code: number } | null }): Promise<string> {
        if (this.channel == null) {
            await this.createChannel(() => { });
        }

        const content = {
            data: data,
            dateTime: new Date()
        };
        await this.channel?.sendToQueue(
            routingKey,
            Buffer.from(JSON.stringify(content)),
            {
                replyTo: replyTo,
                correlationId: correlationId,
                persistent: true
            }
        );

        console.log(`Mesajınız gönderildi!`);
        return correlationId;
    }

    async consumeRPC(routingKey: string, callback: (msg: ConsumeMessage | null) => void): Promise<void> {
        if (this.channel == null) {
            await this.createChannel(() => { });
        }

        this.channel?.prefetch(1);
        const q = await this.channel?.assertQueue(routingKey);
        if (!q)
            return;

        await this.channel?.bindQueue(
            q.queue,
            'amq.direct',
            q.queue
        );

        this.channel?.consume(
            q.queue,
            callback,
            {
                // noAck: false
            }
        );
    }

    async queueFile(routingKey: string, data: { head: string, request: object, error: { message: string, code: number } | null }): Promise<void> {
        if (!this.channel) {
            await this.createChannel(() => { });
        }

        const content = {
            data: data,
            dateTime: new Date()
        };
        await this.channel?.sendToQueue(
            routingKey,
            Buffer.from(JSON.stringify(content)),
            {
                // noAck: false
            }
        );

        console.log(`Mesajınız gönderildi!`);
        return;
    }

    async queueFileKey(routingKey: string, replyTo: string, correlationId: string, data: { head: string, request: object, error: { message: string, code: number } | null }): Promise<void> {
        if (!this.channel) {
            await this.createChannel(() => { });
        }

        const content = {
            data: data,
            dateTime: new Date()
        };
        await this.channel?.sendToQueue(
            routingKey,
            Buffer.from(JSON.stringify(content)),
            {
                replyTo: replyTo,
                correlationId: correlationId,
                persistent: true
            }
        );

        console.log(`Mesajınız gönderildi!`);
        return;
    }

    async ack(msg: ConsumeMessage): Promise<void> {
        this.channel?.ack(msg);
    }

    async nack(msg: ConsumeMessage): Promise<void> {
        this.channel?.nack(msg);
    }
}

export default Producer;