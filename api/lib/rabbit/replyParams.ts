import amqp from 'amqplib';

export interface Data<CONSUMER, BODY> {
    consumer: CONSUMER;
    content: Content<BODY>;
    msg: amqp.ConsumeMessage; // You might want to use a more specific type from amqplib
}

export interface Content<BODY> {
    success: boolean,
    data: BODY | null,
    error: { code: number, message: string } | null
}