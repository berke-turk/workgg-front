import amqp from 'amqplib';

export interface Data<CONSUMER, REQUEST> {
    consumer: CONSUMER;
    content: Content<REQUEST>;
    msg: amqp.ConsumeMessage; // You might want to use a more specific type from amqplib
}

export interface Content<REQUEST> {
    data: {
        head: string;
        request: REQUEST;
        error: any;
    };
    dateTime: string;
}