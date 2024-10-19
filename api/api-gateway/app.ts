import pjson from '../package.json';

import express, { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import Producer, { } from './rabbit/producer';
import RabbitConfig from '../lib/rabbit/config';

const app: express.Application = express();
const b_r: string = '/v' + pjson.version;

app.use(cors());
app.use(requestIp.mw());
app.use(bodyParser.json({ type: "application/json" }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/', 
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(morgan('tiny'), (req: Request, res: Response, next: NextFunction) => { console.log(req.clientIp); next(); });

/* Routers */
import AuthorizeRouter from './routers/authorize';
import UserRouter from './routers/user';
import PaperRouter from './routers/paper';

app.use(b_r + '/authorize', AuthorizeRouter);
app.use(b_r + '/users', UserRouter);
app.use(b_r + '/papers', PaperRouter);
//

app.use(b_r, async (req: Request, res: Response, next: NextFunction) => {
    const address = listener.address();

    if (address && typeof address !== 'string') {
        res.status(200).json({
            listener: {
                message: "Merhaba :))"
            }
        });
    } else {
        res.status(500).json({
            error: 'Listener address is not available.'
        });
    }
});

const listener = app.listen(4140, 'localhost', () => {
    console.log("Server started ::" + 4140);
});


// Start Rabbit Channel
interface ListenerBody {
    success: boolean,
    data: any,
    error: { code: string | number, message: string } | null
}

declare global {
    var producer: Producer;
    var consumeListeners: Map<string, (content: { data: { body: ListenerBody }, dateTime: string }) => Promise<void>>;
}
global.producer = new Producer();
global.consumeListeners = new Map<string, (content: { data: { body: ListenerBody }, dateTime: string }) => Promise<void>>();

global.producer.consumeRPC(
    RabbitConfig.directReply,
    async (msg) => {
        try {
            if (msg == null)
                return;

            const content: any = JSON.parse(msg.content.toString());
            if (!content) {
                console.log("error");
                return;
            }

            console.log(global.consumeListeners);
            if (!global.consumeListeners.has(msg.properties.correlationId)) {
                console.log("Burada yok" + msg.properties.correlationId);
                global.producer.ack(msg);
                return;
            }

            let consume = global.consumeListeners.get(msg.properties.correlationId);
            if (consume)
                consume(content);
            global.consumeListeners.delete(msg.properties.correlationId);
            global.producer.ack(msg);
        } catch (error) {
            console.log("Api gateway crash...");
        }
    }
);
