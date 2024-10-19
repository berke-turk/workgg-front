import pjson from '../../package.json';
import consoleTitle from '../../lib/console/title';
import * as Crypto from '../../lib/functions/crypto';

console.log(Crypto.passwordHash("123456789"));
// Processors
import * as Processors from './processor/authorize';

// Rabbit
import Consumer from './rabbit/consumer';
import RabbitConfig from '../../lib/rabbit/config';
import * as rabbitDataParams from '../../lib/rabbit/dataParams';

// Create Rabbit Consumer
const RabbitChannel = {
    consumer: new Consumer() // new 
}

RabbitChannel.consumer.createChannel(() => {
    RabbitChannel.consumer.consume(
        RabbitConfig.exchangeNames.authorize.queue,
        async (msg) => {
            try {
                if (!msg) {
                    console.log("Received null message");
                    return;
                }

                let content: rabbitDataParams.Content<any> = JSON.parse(msg.content.toString());
                if (!content) {
                    console.log("error json");
                    return;
                }

                const processorParams: rabbitDataParams.Data<Consumer, any> = { consumer: RabbitChannel.consumer, content, msg };

                switch (content.data.head) {
                    case RabbitConfig.exchangeNames.authorize.queues.password:
                        await Processors.Password(processorParams);
                        break;
                    case RabbitConfig.exchangeNames.authorize.queues.logout:
                        await Processors.Logout(processorParams);
                        break;
                    default:
                        console.log(`Unknown queue: ${content.data.head}`);
                        break;
                }
                RabbitChannel.consumer.ack(msg);
            } catch (error) {
                console.log(error);
            }
        }
    );
});

consoleTitle(`Getarf v${pjson.version}.${pjson.sub_version} - Authorize`);