import {Info} from './xkcd';
import {Message} from './message';

export function mutate(input : Info, message = <Message>{}) : Message {
    return Object.assign({}, message, {
        attachments: [
            {
                fallback: `#${input.num}: ${input.title}`,
                image_url: input.img, 
                title: input.title,
                title_link: `https://xkcd.com/${input.num}`,
                color: "#764FA5",
            },
            {text: "", footer: input.alt},
        ]
    });
}