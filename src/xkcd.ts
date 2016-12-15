import {get} from 'http';

export interface Info {
    num : number,
    day : string,
    month : string,
    year : string,
    news : string,
    safe_title : string,
    transcript : string,
    alt : string,
    img : string,
    title : string,
}

export function fetchXKCD(num? : number) : Promise<Info> {
    let url = "http://xkcd.com/info.0.json";
    
    if (num) {
        url = `http://xkcd.com/${num}/info.0.json`
    }

    return new Promise((res, rej) => {
        get(url, (response) => {
            let body = '';
            response.on('data', chunk => body += chunk);
            response.on('end', () => {
                let info = JSON.parse(body);
                res(info);
            });
        }).on('error', rej)
    })
}