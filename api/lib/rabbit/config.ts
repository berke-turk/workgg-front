import * as pjson from '../../package.json';

const Config = {
    url: {
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'guest',
        password: 'guest',
        locale: 'en_US',
        frameMax: 0,
        heartbeat: 0,
        vhost: '/',
    },
    exchangeNames: {
        authorize: {
            name: 'amq.direct',
            queue: 'workgg/' + 'v' + pjson.version + '/' + pjson.sub_version + '/service/authorize',
            queues: {
                sendOtp: '/send-otp',
                verifyOtp: '/verify-otp',
                register: '/register',
                password: '/password',
                refreshToken: '/refresh-token',
                logout: '/logout'
            }
        },
        user: {
            name: 'amq.direct',
            queue: 'workgg/' + 'v' + pjson.version + '/' + pjson.sub_version + '/service/user',
            queues: {
                create: '/create',
                list: '/list',
            }
        },
        paper: {
            name: 'amq.direct',
            queue: 'workgg/' + 'v' + pjson.version + '/' + pjson.sub_version + '/service/paper',
            queues: {
                create: '/create',
                list: '/list',
                editPage: '/edit-page',
                update: '/update',
                details: '/details',
                delete: '/delete'
            }
        },
    },
    directReply: 'workgg/' + 'v' + pjson.version + '/' + pjson.sub_version + '/listener/api-gateway/reply'
} as const

export default Config;