import * as rabbitReplyParams from '../rabbit/replyParams';
import { IConsumer } from '../rabbit/consumer';

export default async function reply<Body>({ consumer, msg, content }: rabbitReplyParams.Data<IConsumer, Body>) {
    consumer.queueRPC(msg.properties.replyTo, 'null', msg.properties.correlationId,
        {
            body: content,
            error: null,
        }
    );
}