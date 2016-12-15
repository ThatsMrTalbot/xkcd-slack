import {request} from 'https';
import {stringify as query} from 'querystring';

export interface Attachment {
    title? : string,
    title_link? : string,
    fallback? : string,
    text? : string,
    image_url? : string,
    footer? : string,
    color? : string,
}

export interface Message {
    token : string,
    channel : string,
    username? : string,
    attachments? : Array<Attachment>,
    icon_url? : string,
}

export function defaultMessage(token : string, channel : string, user? : string, avatar? : string) : Message {
    let msg = <Message>{token, channel};
    if(user) msg.username = user;
    if(avatar) msg.icon_url = avatar;
    return msg;
}

function postData(msg : Message) : string {
    return query(Object.assign({}, msg, {
        attachments: JSON.stringify(msg.attachments),
    }))
}

export function postMessage(message : Message) : Promise<void> {
    let data = postData(message);
    let options = {
        host: "slack.com",
        path: "/api/chat.postMessage",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data),
        },
    };

    return new Promise<void>((res, rej) => {
        let req = request(options, response => {
            let body = '';
            response.on('data', chunk => body += chunk);
            response.on('end', () => {
                let info = JSON.parse(body);
                res(info);
            });
        }).on('error', rej)

        req.write(data);
        req.end();
    })
}